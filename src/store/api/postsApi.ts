import { createApi } from '@reduxjs/toolkit/query/react';
import { db } from '../../config/firebase-config';
import { addDoc, collection, getDocs, deleteDoc, updateDoc, doc } from "firebase/firestore";

type Props = {
	baseUrl: string;
	url: string;
	method: string;
	body: any;
};

const firebaseBaseQuery = async ({ baseUrl, url, method, body }: Props) => {
	switch (method) {
		case 'GET':
			const snapshot = await getDocs(collection(db, url));	
			const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
			return { data };

		case 'POST':
			const docRef = await addDoc(collection(db, url), body);
			return { data: { id: docRef.id, ...body } };

		case 'PATCH':
			const updatedRef = await updateDoc(doc(db, url), body);
			return { data: { id: updatedRef, ...body } };

		case 'DELETE':
			const deletedRef = await deleteDoc(doc(db, url));
			return { data: { id: deletedRef, ...body } };

		default:
			throw new Error(`Unhandled method ${method}`);
	}
};

export const postsApi = createApi({
  reducerPath: 'postsApi',
	baseQuery: firebaseBaseQuery,
	tagTypes: ['posts'],
	endpoints: (builder) => ({
		createPost: builder.mutation({
			query: ({ post }) => ({
				baseUrl: '',
				url: 'posts',
				method: 'POST',
				body: post
			}),
			invalidatesTags: ['posts'],
		}),
		getPosts: builder.query({
			query: ({ postList }) => ({
				baseUrl: '',
				url: 'posts',
				method: 'GET',
				body: postList
			}),
			providesTags: ['posts'],
		}),
		updatePost: builder.mutation({
			query: ({ postId, ...post }) => ({
				baseUrl: '',
				url: `posts/${postId}`,
				method: 'PATCH',
				body: {
					text: post.text,
				}
			}),
			invalidatesTags: ['posts'],
		}),
		deletePost: builder.mutation({
			query: ({ postId }) => ({
				baseUrl: '',
				url: `posts/${postId}`,
				method: 'DELETE',
				body: ''
			}),
			invalidatesTags: ['posts'],
		}),
	}),
});

export const { useCreatePostMutation, useGetPostsQuery, useUpdatePostMutation, useDeletePostMutation } = postsApi;