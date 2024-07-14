import { useEffect } from "react";
import PostSkeleton from "../skeleton/postSkeleton";
import Post from "./post";
import { useQuery } from "@tanstack/react-query";


const UserPosts = ({ feedType, username, userId }) => {
	const getPostEndpoint = () => {
		switch (feedType) {
			case "forYou":
				return {uri:"/api/post/all",method:"GET"};
			case "following":
				return { uri:"/api/post/following",method:"GET"};
			case "posts":
				return { uri:`/api/post/user/${username}`,method:"GET"};
			case "likes":
				return { uri:`/api/post/likes/${userId}`,method:"GET"};
			default:
				return { uri:"/api/post/all", method:"GET"};
		}
	};

	const POST_ENDPOINT = getPostEndpoint();

	const {
		data: posts,
		isLoading,
		refetch,
		isRefetching,
	} = useQuery({
		queryKey: ["posts"],
		queryFn: async () => {
			try {
				const res = await fetch(POST_ENDPOINT.uri,{
					method: POST_ENDPOINT.method,
				});
				const data = await res.json();

				if (!res.ok) {
					throw new Error(data.error || "Something went wrong");
				}

				return data;
			} catch (error) {
				throw new Error(error);
			}
		},
	});

	useEffect(() => {
		refetch();
	}, [feedType, refetch, username]);

	return (
		<>
			{(isLoading || isRefetching) && (
				<div className='flex flex-col justify-center'>
					<PostSkeleton />
					<PostSkeleton />
					<PostSkeleton />
				</div>
			)}
			{!isLoading && !isRefetching && posts?.length === 0 && (
				<p className='text-center my-4'>No posts in this tab. Switch 👻</p>
			)}
			{!isLoading && !isRefetching && posts && (
				<div>
					{posts.map((post) => (
						<Post key={post._id} post={post} />
					))}
				</div>
			)}
		</>
	);
};
export default UserPosts;