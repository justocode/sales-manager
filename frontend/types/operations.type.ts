export type Maybe<T> = T | null;
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
  __typename?: 'Color',
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
  post?: Maybe<Post>,
  posts?: Maybe<Array<Maybe<Post>>>,
  _empty?: Maybe<Scalars['String']>,
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
export type MockupFragment = (
  { __typename?: 'Mockup' }
  & Pick<Mockup, 'id' | 'name' | 'addedAt' | 'mugId' | 'mugName' | 'designId' | 'designName' | 'patternName' | 'sku' | 'link' | 'sharedLink' | 'b64'>
  & { color: (
    { __typename?: 'Color' }
    & Pick<Color, 'name' | 'hex' | 'amzColor'>
  ) }
);

export type CreateMockupMutationVariables = {
  input: MockupInput
};


export type CreateMockupMutation = (
  { __typename?: 'Mutation' }
  & { createMockup: Maybe<{ __typename?: 'Mockup' }
    & MockupFragment
  > }
);

export type MockupsQueryVariables = {};


export type MockupsQuery = (
  { __typename?: 'Query' }
  & { mockups: Maybe<Array<Maybe<{ __typename?: 'Mockup' }
    & MockupFragment
  >>> }
);

export type PostFragment = (
  { __typename?: 'Post' }
  & Pick<Post, 'id' | 'title' | 'content'>
  & { author: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email'>
  )> }
);

export type PostsQueryVariables = {};


export type PostsQuery = (
  { __typename?: 'Query' }
  & { posts: Maybe<Array<Maybe<{ __typename?: 'Post' }
    & PostFragment
  >>> }
);
