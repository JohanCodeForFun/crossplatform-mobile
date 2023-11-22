import { createApi } from '@reduxjs/toolkit/query/react';
import { db } from '../../config/firebase-config';
import { addDoc, collection, getDocs, updateDoc, doc, query, orderBy, where, writeBatch } from "firebase/firestore";

type Props = {
	baseUrl: string;
	url: string;
	method: string;
	body: any;
};

const firebaseBaseQuery = async ({ url, method, body }: Props) => {
	switch (method) {
		case 'GET':
			const snapshot = await getDocs(query(collection(db, url), orderBy('createdAt', 'desc')));	
			const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
			return { data };

		case 'POST':
			const docRef = await addDoc(collection(db, url), body);
			return { data: { id: docRef.id, ...body } };

		case 'PATCH':
			const updatedRef = await updateDoc(doc(db, url), body);
			return { data: { id: updatedRef, ...body } };

		case 'DELETE':
			try {
				const usersPosts = await getDocs(query(collection(db, url), where('createdBy', '==', body)));
				usersPosts.docs.map(doc => ({id: doc.id, ...doc.data() }));
	
				const batch = writeBatch(db);
				usersPosts.forEach((doc) => {
					batch.delete(doc.ref);
				});
	
				await batch.commit();

				return { data: { id: body, ...body } };

			} catch(error) {
				console.error('Error deleting documents: ', error);
			};

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
		deletePost: builder.mutation({
			query: ({ postId }) => ({
				baseUrl: '',
				url: `posts/${postId}`,
				method: 'DELETE',
				body: ''
			}),
			invalidatesTags: ['posts'],
		}),
		deleteUserPosts: builder.mutation({
			query: ({ createdBy }) => ({
				baseUrl: '',
				url: `posts/`,
				method: 'DELETE',
				body: createdBy
			}),
			invalidatesTags: ['posts'],
		}),
	}),
});

export const { useCreatePostMutation, useGetPostsQuery, useDeletePostMutation, useDeleteUserPostsMutation } = postsApi;