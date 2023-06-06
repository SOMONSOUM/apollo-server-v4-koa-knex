export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  JSON: any;
  Upload: any;
};

export type LoginInput = {
  email?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
};

export type Me = {
  __typename?: 'Me';
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  token?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  loginAdmin?: Maybe<Me>;
  multipleUpload?: Maybe<Array<Maybe<UploadFileResponse>>>;
  registerAdmin?: Maybe<Ok>;
  singleUpload?: Maybe<UploadFileResponse>;
  testingMuation?: Maybe<Scalars['Boolean']>;
};


export type MutationLoginAdminArgs = {
  input?: InputMaybe<LoginInput>;
};


export type MutationMultipleUploadArgs = {
  files?: InputMaybe<Array<InputMaybe<Scalars['Upload']>>>;
};


export type MutationRegisterAdminArgs = {
  input?: InputMaybe<RegisterInput>;
};


export type MutationSingleUploadArgs = {
  file?: InputMaybe<Scalars['Upload']>;
};

export type Ok = {
  __typename?: 'Ok';
  ok?: Maybe<Scalars['Boolean']>;
};

export type Query = {
  __typename?: 'Query';
  hellWorld?: Maybe<Scalars['String']>;
};

export type RegisterInput = {
  email?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  testingSub?: Maybe<Scalars['String']>;
};

export type UploadFileResponse = {
  __typename?: 'UploadFileResponse';
  encoding?: Maybe<Scalars['String']>;
  filename?: Maybe<Scalars['String']>;
  mimetype?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  password?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};
