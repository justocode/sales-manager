import { GraphQLResolveInfo } from 'graphql';
import { Context } from './context.type';
export type Maybe<T> = T | null;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};

export type Color = {
   __typename?: 'Color',
  name: Scalars['String'],
  hex: Scalars['String'],
  amzColor: Scalars['String'],
};

export type ColorInput = {
  name: Scalars['String'],
  hex: Scalars['String'],
  amzColor: Scalars['String'],
};

export type Mockup = {
   __typename?: 'Mockup',
  id: Scalars['Int'],
  name: Scalars['String'],
  addedAt: Scalars['Int'],
  uploadedAt?: Maybe<Scalars['Int']>,
  recycledAt?: Maybe<Scalars['Int']>,
  mugId: Scalars['Int'],
  mugName: Scalars['String'],
  designId: Scalars['Int'],
  designName: Scalars['String'],
  patternName: Scalars['String'],
  sku: Scalars['String'],
  color: Color,
  link?: Maybe<Scalars['String']>,
  sharedLink?: Maybe<Scalars['String']>,
  b64?: Maybe<Scalars['String']>,
};

export type MockupInput = {
  id: Scalars['Int'],
  name: Scalars['String'],
  addedAt: Scalars['Int'],
  uploadedAt?: Maybe<Scalars['Int']>,
  recycledAt?: Maybe<Scalars['Int']>,
  mugId: Scalars['Int'],
  mugName: Scalars['String'],
  designId: Scalars['Int'],
  designName: Scalars['String'],
  patternName: Scalars['String'],
  sku: Scalars['String'],
  color: ColorInput,
  link?: Maybe<Scalars['String']>,
  sharedLink?: Maybe<Scalars['String']>,
  b64?: Maybe<Scalars['String']>,
};

export type Mutation = {
   __typename?: 'Mutation',
  _empty?: Maybe<Scalars['String']>,
  createPost?: Maybe<Post>,
  updatePost?: Maybe<Post>,
  deletePost?: Maybe<Scalars['Boolean']>,
  signUpToGetToken?: Maybe<Scalars['String']>,
  signInToGetToken?: Maybe<Scalars['String']>,
  createMockup?: Maybe<Mockup>,
};


export type MutationCreatePostArgs = {
  input?: Maybe<PostInput>
};


export type MutationUpdatePostArgs = {
  id: Scalars['ID'],
  input?: Maybe<PostInput>
};


export type MutationDeletePostArgs = {
  id: Scalars['ID']
};


export type MutationSignUpToGetTokenArgs = {
  input?: Maybe<UserInput>
};


export type MutationSignInToGetTokenArgs = {
  input?: Maybe<UserInput>
};


export type MutationCreateMockupArgs = {
  input?: Maybe<MockupInput>
};

export type Post = {
   __typename?: 'Post',
  id: Scalars['ID'],
  title?: Maybe<Scalars['String']>,
  content?: Maybe<Scalars['String']>,
  author?: Maybe<User>,
};

export type PostInput = {
  title: Scalars['String'],
  content?: Maybe<Scalars['String']>,
};

export type Query = {
   __typename?: 'Query',
  _empty?: Maybe<Scalars['String']>,
  post?: Maybe<Post>,
  posts?: Maybe<Array<Maybe<Post>>>,
  user?: Maybe<User>,
  mockups?: Maybe<Array<Maybe<Mockup>>>,
};


export type QueryPostArgs = {
  id: Scalars['ID']
};


export type QueryPostsArgs = {
  take?: Maybe<Scalars['Int']>,
  skip?: Maybe<Scalars['Int']>
};


export type QueryUserArgs = {
  id: Scalars['ID']
};

export type User = {
   __typename?: 'User',
  id: Scalars['ID'],
  email?: Maybe<Scalars['String']>,
  posts?: Maybe<Array<Maybe<Post>>>,
};


export type UserPostsArgs = {
  take?: Maybe<Scalars['Int']>,
  skip?: Maybe<Scalars['Int']>
};

export type UserInput = {
  email: Scalars['String'],
  password: Scalars['String'],
};


export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;


export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>,
  String: ResolverTypeWrapper<Scalars['String']>,
  ID: ResolverTypeWrapper<Scalars['ID']>,
  Post: ResolverTypeWrapper<Post>,
  User: ResolverTypeWrapper<User>,
  Int: ResolverTypeWrapper<Scalars['Int']>,
  Mockup: ResolverTypeWrapper<Mockup>,
  Color: ResolverTypeWrapper<Color>,
  Mutation: ResolverTypeWrapper<{}>,
  PostInput: PostInput,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
  UserInput: UserInput,
  MockupInput: MockupInput,
  ColorInput: ColorInput,
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {},
  String: Scalars['String'],
  ID: Scalars['ID'],
  Post: Post,
  User: User,
  Int: Scalars['Int'],
  Mockup: Mockup,
  Color: Color,
  Mutation: {},
  PostInput: PostInput,
  Boolean: Scalars['Boolean'],
  UserInput: UserInput,
  MockupInput: MockupInput,
  ColorInput: ColorInput,
};

export type ColorResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Color'] = ResolversParentTypes['Color']> = {
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  hex?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  amzColor?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
};

export type MockupResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mockup'] = ResolversParentTypes['Mockup']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  addedAt?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  uploadedAt?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  recycledAt?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  mugId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  mugName?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  designId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  designName?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  patternName?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  sku?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  color?: Resolver<ResolversTypes['Color'], ParentType, ContextType>,
  link?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  sharedLink?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  b64?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
};

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  _empty?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  createPost?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType, MutationCreatePostArgs>,
  updatePost?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType, RequireFields<MutationUpdatePostArgs, 'id'>>,
  deletePost?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationDeletePostArgs, 'id'>>,
  signUpToGetToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, MutationSignUpToGetTokenArgs>,
  signInToGetToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, MutationSignInToGetTokenArgs>,
  createMockup?: Resolver<Maybe<ResolversTypes['Mockup']>, ParentType, ContextType, MutationCreateMockupArgs>,
};

export type PostResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Post'] = ResolversParentTypes['Post']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  content?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  author?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>,
};

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  _empty?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  post?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType, RequireFields<QueryPostArgs, 'id'>>,
  posts?: Resolver<Maybe<Array<Maybe<ResolversTypes['Post']>>>, ParentType, ContextType, QueryPostsArgs>,
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>,
  mockups?: Resolver<Maybe<Array<Maybe<ResolversTypes['Mockup']>>>, ParentType, ContextType>,
};

export type UserResolvers<ContextType = Context, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  posts?: Resolver<Maybe<Array<Maybe<ResolversTypes['Post']>>>, ParentType, ContextType, UserPostsArgs>,
};

export type Resolvers<ContextType = Context> = {
  Color?: ColorResolvers<ContextType>,
  Mockup?: MockupResolvers<ContextType>,
  Mutation?: MutationResolvers<ContextType>,
  Post?: PostResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
  User?: UserResolvers<ContextType>,
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = Context> = Resolvers<ContextType>;
