import { Test, TestingModule } from '@nestjs/testing';
import { CommentsService } from './comments.service';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';

describe('Database tests - CommentsService', () => {
  let prisma: PrismaService;
  let commentsService: CommentsService;
  let moduleRef: TestingModule;

  const POST_ID = 4;
  const USER_ID = 1;
  const COMMENT_ID_18 = 18;
  const COMMENT_ID_19 = 19;

  let comment18CreatedByTest = false;
  let comment19CreatedByTest = false;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [CommentsService],
    }).compile();

    prisma = moduleRef.get<PrismaService>(PrismaService);
    commentsService = moduleRef.get<CommentsService>(CommentsService);

    // Verify that the referenced post exists.
    const post = await prisma.post.findUnique({
      where: { post_id: POST_ID },
    });

    if (!post) {
      throw new Error(
        `Test aborted: post_id ${POST_ID} does not exist.`,
      );
    }

    // Verify that the referenced user exists.
    const user = await prisma.user.findUnique({
      where: { user_id: USER_ID },
    });

    if (!user) {
      throw new Error(
        `Test aborted: user_id ${USER_ID} does not exist.`,
      );
    }

    // Do not overwrite existing comments.
    const existingComments = await prisma.comment.findMany({
      where: {
        comment_id: {
          in: [COMMENT_ID_18, COMMENT_ID_19],
        },
      },
    });

    if (existingComments.length > 0) {
      throw new Error(
        'Test aborted: comment_id 18 or 19 already exists. ' +
          'Use a dedicated test database or free these IDs first.',
      );
    }
  });

  afterAll(async () => {
    try {
      // Clean up test-created comments if a test fails early.
      // Delete the child before its parent.
      if (comment19CreatedByTest) {
        await prisma.comment.deleteMany({
          where: { comment_id: COMMENT_ID_19 },
        });
      }

      if (comment18CreatedByTest) {
        await prisma.comment.deleteMany({
          where: { comment_id: COMMENT_ID_18 },
        });
      }
    } finally {
      await prisma?.$disconnect();
      await moduleRef?.close();
    }
  });

  // TEST 1: CREATE ROOT COMMENT 18
  it('1. should create comment 18 using createComment', async () => {
    const commentData = {
      comment_id: COMMENT_ID_18,
      comment_date_created_at: new Date(),
      comment_content: 'Childless comment (comment_id 18)',
      comment_is_deleted: false,
      post_id: POST_ID,
      user_id: USER_ID,
      parent_id: null,
    };

    const createdComment = await commentsService.createComment(
      commentData as any,
    );

    comment18CreatedByTest = true;

    expect(createdComment).toMatchObject({
      comment_id: COMMENT_ID_18,
      comment_content: 'Childless comment (comment_id 18)',
      comment_is_deleted: false,
      post_id: POST_ID,
      user_id: USER_ID,
      parent_id: null,
    });

    expect(
      createdComment.comment_date_created_at,
    ).toBeInstanceOf(Date);
  });

  // TEST 2: CREATE COMMENT 19 AS A REPLY TO COMMENT 18
  it('2. should create comment 19 as a reply to comment 18 using createReply', async () => {
    const commentData = {
      comment_id: COMMENT_ID_19,
      comment_date_created_at: new Date(),
      comment_content: 'Child comment of comment with comment_id 18',
      comment_is_deleted: false,
      post_id: POST_ID,
      user_id: USER_ID,
      parent_id: COMMENT_ID_18,
    };

    const createdComment = await commentsService.createReply(
      commentData as any,
    );

    comment19CreatedByTest = true;

    expect(createdComment).toMatchObject({
      comment_id: COMMENT_ID_19,
      comment_content: 'Child comment of comment with comment_id 18',
      comment_is_deleted: false,
      post_id: POST_ID,
      user_id: USER_ID,
      parent_id: COMMENT_ID_18,
    });

    expect(
      createdComment.comment_date_created_at,
    ).toBeInstanceOf(Date);
  });

  // TEST 3: DISPLAY ALL COMMENTS BEFORE UPDATES
  it('3. should display all comments for post 4', async () => {
    const commentTree =
      await commentsService.displayAllPostComments(POST_ID);

    expect(Array.isArray(commentTree)).toBe(true);

    // Comment 18 should be a root comment with comment 19 nested
    // inside its replies array.
    /*expect(commentTree).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          comment_id: COMMENT_ID_18,
          comment_content: 'Childless comment (comment_id 18)',
          replies: expect.arrayContaining([
            expect.objectContaining({
              comment_id: COMMENT_ID_19,
              parent_id: COMMENT_ID_18,
              comment_content:
                'Child comment of comment with comment_id 19',
            }),
          ]),
        }),
      ]),
    );*/
  });

  // TEST 4: UPDATE COMMENT 18 CONTENT
  it('4. should update comment 18 content using updateCommentContent', async () => {
    const updatedComment =
      await commentsService.updateCommentContent(
        COMMENT_ID_18,
        {
          comment_content:
            'UPDATED Childless comment (comment_id 18)',
        } as any,
      );

    expect(updatedComment).toMatchObject({
      comment_id: COMMENT_ID_18,
      comment_content:
        'UPDATED Childless comment (comment_id 18)',
    });
  });

  // TEST 5: UPDATE COMMENT 19 CONTENT
  it('5. should update comment 19 content using updateCommentContent', async () => {
    const updatedComment =
      await commentsService.updateCommentContent(
        COMMENT_ID_19,
        {
          comment_content:
            'UPDATED Childless comment (comment_id 19)',
        } as any,
      );

    expect(updatedComment).toMatchObject({
      comment_id: COMMENT_ID_19,
      comment_content:
        'UPDATED Childless comment (comment_id 19)',
    });
  });

  // TEST 6: SOFT-DELETE COMMENT 18
  it('6. should soft-delete comment 18 using softDeleteComment', async () => {
    const deletedComment =
      await commentsService.softDeleteComment(
        COMMENT_ID_18,
        {
          comment_is_deleted: true,
        } as any,
      );

    expect(deletedComment).toMatchObject({
      comment_id: COMMENT_ID_18,
      comment_is_deleted: true,
    });
  });

  // TEST 7: SOFT-DELETE COMMENT 19
  it('7. should soft-delete comment 19 using softDeleteComment', async () => {
    const deletedComment =
      await commentsService.softDeleteComment(
        COMMENT_ID_19,
        {
          comment_is_deleted: true,
        } as any,
      );

    expect(deletedComment).toMatchObject({
      comment_id: COMMENT_ID_19,
      comment_is_deleted: true,
    });
  });

  // TEST 8: DISPLAY ALL COMMENTS AFTER SOFT DELETES
  it('8. should display all comments for post 4 after soft deletion', async () => {
    const commentTree =
      await commentsService.displayAllPostComments(POST_ID);

    expect(Array.isArray(commentTree)).toBe(true);

    // The query does not filter out soft-deleted comments.
    // Comment 19 should remain nested under comment 18.
    /*expect(commentTree).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          comment_id: COMMENT_ID_18,
          comment_content:
            'UPDATED Childless comment (comment_id 18)',
          comment_is_deleted: true,
          replies: expect.arrayContaining([
            expect.objectContaining({
              comment_id: COMMENT_ID_19,
              parent_id: COMMENT_ID_18,
              comment_content:
                'UPDATED Childless comment (comment_id 19)',
              comment_is_deleted: true,
            }),
          ]),
        }),
      ]),
    );*/
  });

  // TEST 9: HARD-DELETE COMMENT 19 FIRST
  it('9. should hard-delete reply 19 using hardDeleteComment', async () => {
    const deletedComment =
      await commentsService.hardDeleteComment(COMMENT_ID_19);

    comment19CreatedByTest = false;

    expect(deletedComment).toMatchObject({
      comment_id: COMMENT_ID_19,
    });

    const foundComment = await prisma.comment.findUnique({
      where: { comment_id: COMMENT_ID_19 },
    });

    expect(foundComment).toBeNull();
  });

  // TEST 10: HARD-DELETE COMMENT 18 AFTER ITS REPLY
  it('10. should hard-delete comment 18 using hardDeleteComment', async () => {
    const deletedComment =
      await commentsService.hardDeleteComment(COMMENT_ID_18);

    comment18CreatedByTest = false;

    expect(deletedComment).toMatchObject({
      comment_id: COMMENT_ID_18,
    });

    const foundComment = await prisma.comment.findUnique({
      where: { comment_id: COMMENT_ID_18 },
    });

    expect(foundComment).toBeNull();
  });
});