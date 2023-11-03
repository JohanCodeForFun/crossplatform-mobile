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

export const usersApi = createApi({
  reducerPath: 'usersApi',
	baseQuery: firebaseBaseQuery,
	tagTypes: ['users'],
	endpoints: (builder) => ({
		createUser: builder.mutation({
			query: ({ user }) => ({
				baseUrl: '',
				url: 'users',
				method: 'POST',
				body: user
			}),
			invalidatesTags: ['users'],
		}),
		getUsers: builder.query({
			query: ({ userList }) => ({
				baseUrl: '',
				url: 'users',
				method: 'GET',
				body: userList
			}),
			providesTags: ['users'],
		}),
		updateUser: builder.mutation({
			query: ({ userId, ...user }) => ({
				baseUrl: '',
				url: `users/${userId}`,
				method: 'PATCH',
				body: {
					firstName: user.firstName,
					lastName: user.lastName
				}
			}),
			invalidatesTags: ['users'],
		}),
		deleteUser: builder.mutation({
			query: ({ userId }) => ({
				baseUrl: '',
				url: `users/${userId}`,
				method: 'DELETE',
				body: ''
			}),
			invalidatesTags: ['users'],
		}),
	}),
});

export const { useCreateUserMutation, useGetUsersQuery, useUpdateUserMutation, useDeleteUserMutation } = usersApi;