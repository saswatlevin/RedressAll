import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from './posts.service';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';

 // Remember to delete the duplicate posts created in the database after the tests.
describe('PostsService', () => {
  let service: PostsService;
  let prisma: PrismaService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [PostsService],
    }).compile();

    service = module.get<PostsService>(PostsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('1. should allow duplicate post_content', async () => {
    const data = {
      post_content: 'Test Post 2 for user JULF',
      user_id: 9,
      post_status: 'open',
    };

    const post = await service.createPost(data as any);

    expect(post).toBeDefined();
    expect(post.post_content).toBe('Test Post 2 for user JULF');
    expect(post.user_id).toBe(9);
    expect(post.post_status).toBe('open');
  });

  it('2. should allow duplicate post_title', async () => {
    const data = {
      post_content: 'Some Test Post Content',
      post_title: 'JULF Test Post 2',
      user_id: 9,
      post_status: 'open',
    };

    const post = await service.createPost(data as any);

    expect(post).toBeDefined();
    expect(post.post_title).toBe('JULF Test Post 2');
    expect(post.user_id).toBe(9);
    expect(post.post_status).toBe('open');
  });

  it('3. should delete the post with title JULF Test Post 2 and content Test post 2 for user JULF', async () => {
    const post = await prisma.post.findFirstOrThrow({
      where: {
        post_title: 'JULF Test Post 2',
        post_content: 'Test post 2 for user JULF',
      },
    });

    await service.removePost(post.post_id);

    const deletedPost = await prisma.post.findUnique({
      where: {
        post_id: post.post_id,
      },
    });

    expect(deletedPost).toBeNull();
  });

  it('4. should recreate the deleted post', async () => {
    const data = {
      post_content: 'Test post 2 for user JULF',
      post_title: 'JULF Test Post 2',
      user_id: 9,
      post_status: 'open',
    };

    const post = await service.createPost(data as any);

    expect(post).toBeDefined();
    expect(post.post_title).toBe('JULF Test Post 2');
    expect(post.post_content).toBe('Test post 2 for user JULF');
    expect(post.user_id).toBe(9);
    expect(post.post_status).toBe('open');
  });
});
/**
 * <escape>[
  {
    "post_id": 4,
    "post_date_created_at": "2026-08-13T10:30:49.231396+05:30",
    "post_content": "STU Post One",
    "user_id": 7,
    "post_status": "open",
    "post_title": "DEFAULT POST TITLE"
  }
]</escape>
 */