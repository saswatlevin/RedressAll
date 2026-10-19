import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from './posts.service';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';

describe('Database tests - PostsService', () => {
  let prisma: PrismaService;
  let postsService: PostsService;
  let moduleRef: TestingModule;

  const POST_ID = 8;
  const USER_ID = 7;

  let postCreatedByTest = false;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [PostsService],
    }).compile();

    prisma = moduleRef.get<PrismaService>(PrismaService);
    postsService = moduleRef.get<PostsService>(PostsService);

    // Verify that the referenced user exists.
    const user = await prisma.user.findUnique({
      where: { user_id: USER_ID },
    });

    if (!user) {
      throw new Error(
        `Test aborted: user_id ${USER_ID} does not exist.`,
      );
    }

    // Do not overwrite an existing post.
    const existingPost = await prisma.post.findUnique({
      where: { post_id: POST_ID },
    });

    if (existingPost) {
      throw new Error(
        `Test aborted: post_id ${POST_ID} already exists. ` +
          'Use a dedicated test database or free this ID first.',
      );
    }
  });

  afterAll(async () => {
    try {
      // Clean up if a test fails before the deletion test.
      if (postCreatedByTest) {
        await prisma.post.deleteMany({
          where: { post_id: POST_ID },
        });
      }
    } finally {
      await prisma?.$disconnect();
      await moduleRef?.close();
    }
  });

  // TEST 1: CREATE POST
  it('1. should create a post using createPost', async () => {
    const postData = {
      post_id: POST_ID,
      post_date_created_at: new Date(),
      post_content: 'STU Post One',
      user_id: USER_ID,
      post_status: 'open',
      post_title: 'DEFAULT POST TITLE',
    };

    const createdPost = await postsService.createPost(
      postData as any,
    );

    postCreatedByTest = true;

    expect(createdPost).toMatchObject({
      post_id: POST_ID,
      post_content: 'STU Post One',
      user_id: USER_ID,
      post_status: 'open',
      post_title: 'DEFAULT POST TITLE',
    });

    expect(
      createdPost.post_date_created_at,
    ).toBeInstanceOf(Date);
  });

  // TEST 2: SEARCH POSTS BY TITLE
  it('2. should search for a post by title using searchPostsByTitle', async () => {
    const results = await postsService.searchPostsByTitle({
      post_title: 'DEFAULT POST TITLE',
    } as any);

    expect(results).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          post_title: 'DEFAULT POST TITLE',
        }),
      ]),
    );
  });

  // TEST 3: FIND ALL POSTS
  it('3. should retrieve all posts using findAllPosts', async () => {
    const posts = await postsService.findAllPosts();

    expect(Array.isArray(posts)).toBe(true);

    expect(posts).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          post_id: POST_ID,
          post_title: 'DEFAULT POST TITLE',
          post_content: 'STU Post One',
        }),
      ]),
    );
  });

  // TEST 4: UPDATE POST TITLE
  it('4. should update the post title using updatePostTitle', async () => {
    const updatedPost = await postsService.updatePostTitle(
      POST_ID,
      {
        post_title: 'UPDATED DEFAULT POST TITLE',
      } as any,
    );

    expect(updatedPost).toMatchObject({
      post_id: POST_ID,
      post_title: 'UPDATED DEFAULT POST TITLE',
    });
  });

  // TEST 5: UPDATE POST STATUS
  it('5. should update the post status using updatePostStatus', async () => {
    const updatedPost = await postsService.updatePostStatus(
      POST_ID,
      {
        post_status: 'resolved',
      } as any,
    );

    expect(updatedPost).toMatchObject({
      post_id: POST_ID,
      post_status: 'resolved',
    });
  });

  // TEST 6: UPDATE POST CONTENT
  it('6. should update the post content using updatePostContent', async () => {
    const updatedPost = await postsService.updatePostContent(
      POST_ID,
      {
        post_content: 'STU Post Three',
      } as any,
    );

    expect(updatedPost).toMatchObject({
      post_id: POST_ID,
      post_content: 'STU Post Three',
    });
  });

  // TEST 7: DELETE POST
  it('7. should delete the post using removePost', async () => {
    if (!postCreatedByTest) {
      throw new Error(
        'Cannot delete post: the create-post test did not create it.',
      );
    }

    const deletedPost = await postsService.removePost(POST_ID);

    postCreatedByTest = false;

    expect(deletedPost).toMatchObject({
      post_id: POST_ID,
    });

    const foundPost = await postsService.findOnePost(POST_ID);

    expect(foundPost).toBeNull();
  });
});