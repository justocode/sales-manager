export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};

export type Mockup = {
   __typename?: 'Mockup',
  id: Scalars['ID'],
  name?: Maybe<Scalars['String']>,
  image?: Maybe<Scalars['String']>,
};

export type MockupInput = {
  id: Scalars['ID'],
  name: Scalars['String'],
  image: Scalars['String'],
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
  user?: Maybe<User>,
  _empty?: Maybe<Scalars['String']>,
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
  & Pick<Mockup, 'id' | 'name' | 'image'>
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
