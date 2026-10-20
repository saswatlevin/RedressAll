import { Test, TestingModule } from '@nestjs/testing';
import { CommentsService } from './comments.service';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';

describe('Comment Database Tests', () => {
  let service: CommentsService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [CommentsService],
    }).compile();

    service = module.get<CommentsService>(CommentsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('1. should fail when creating a comment for a non-existent post', async () => {
    const data = {
      comment_content: 'Test Comment with comment_id 17',
      comment_is_deleted: false,
      post_id: 34,
      user_id: 7,
      parent_id: null,
    };

    await expect(
      service.createComment(data as any),
    ).rejects.toThrow();
  });

  it('2. should fail when creating a comment for a non-existent user', async () => {
    const data = {
      comment_content: 'Test Comment with comment_id 18',
      comment_is_deleted: false,
      post_id: 7,
      user_id: 25,
      parent_id: null,
    };

    await expect(
      service.createComment(data as any),
    ).rejects.toThrow();
  });

  it('3. should fail when updating a non-existent comment', async () => {
    const data = {
      comment_content: 'UPDATED test comment with comment_id 19',
    };

    await expect(
      service.updateCommentContent(19, data as any),
    ).rejects.toThrow();
  });

  it('4. should fail when soft-deleting a non-existent comment', async () => {
    const data = {
      comment_is_deleted: true,
    };

    await expect(
      service.softDeleteComment(19, data as any),
    ).rejects.toThrow();
  });

  it('5. should fail when hard-deleting a non-existent comment', async () => {
    await expect(
      service.hardDeleteComment(19),
    ).rejects.toThrow();
  });

  it('6. should return an empty array when displaying comments from a non-existent post', async () => {
    const result = await service.displayAllPostComments(28);

    expect(result).toEqual([]);
  });

  it('7. should return an empty array when searching comments in a non-existent post', async () => {
    const searchData = {
      comment_content: 'test',
    };

    const result = await service.searchCommentsByPost(28, searchData as any);

    expect(result).toEqual([]);
  });

  it('8. should fail when creating a reply to a non-existent comment', async () => {
    const data = {
      comment_content: 'Test reply to comment_id 19',
      comment_is_deleted: false,
      post_id: 7,
      user_id: 7,
      parent_id: 19,
    };

    await expect(
      service.createReply(data as any),
    ).rejects.toThrow();
  });
});

/**
 * <escape>[
  {
    "comment_id": 17,
    "comment_date_created_at": "2026-09-08T06:23:25.396+05:30",
    "comment_content": "Reply TWO to Second child-less comment from user_id 8 for post_id 4 with parent_id 15 and comment_id 17",
    "comment_is_deleted": false,
    "post_id": 4,
    "user_id": 8,
    "parent_id": null
  }
]</escape>
 */