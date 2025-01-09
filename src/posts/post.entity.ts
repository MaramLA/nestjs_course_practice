import { MetaOption } from 'src/meta-options/metaOption.entity';
import { Tag } from 'src/tags/tag.entity';
import { User } from 'src/users/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PostStatus } from './enums/postStatus.enum';
import { PostType } from './enums/postType.enum';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', length: 512, nullable: false })
  title: string;
  @Column({
    type: 'enum',
    enum: PostType,
    nullable: false,
    default: PostType.POST,
  })
  postType: PostType;
  @Column({ type: 'varchar', nullable: false, length: 256, unique: true })
  slug: string;
  @Column({
    type: 'enum',
    enum: PostStatus,
    nullable: false,
    default: PostStatus.DRAFT,
  })
  status: PostStatus;
  @Column({ type: 'text', nullable: true })
  content: string;
  @Column({ type: 'text', nullable: true })
  schema: string;
  @Column({ type: 'varchar', nullable: true, length: 1024 })
  featuredImageUrl: string;
  @Column({ type: 'timestamp', nullable: true }) //datetime in mysql
  publishOn: Date;

  // Foreign Keys
  @ManyToMany(() => Tag, (tag) => tag.posts)
  @JoinTable()
  tags?: Tag[];

  @OneToOne(() => MetaOption, (metaOption) => metaOption.post, {
    cascade: true,
    eager: true,
  })
  metaOptions?: MetaOption;
  @ManyToOne(
    () => User,
    (user) => user.posts,
    // { eager: true }
  )
  author: User;
}
