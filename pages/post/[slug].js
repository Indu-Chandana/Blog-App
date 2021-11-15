import React from 'react';

import { getPosts, getPostDetails } from '../../services';

import { PostDetail, Categories, PostWidget, Author, Comments, CommentsForm } from '../../components'
const PostDetails = ({ post }) => {
    console.log(post);
    return (
        <div className="container mx-auto px-10 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="col-span-1 lg:col-span-8">
                    <PostDetail post={post}/>
                    <Author author={post.author}/>
                    <CommentsForm slug={post.slug}/>
                    <Comments slug={post.slug}/>
                </div>
                <div className="col-span-1 lg:col-span-4">
                    <div className="relative lg:sticky top-8">
                                                                          {/* In that time, post.categories is array. we can use map for get category.slug */}
                        <PostWidget slug={post.slug} categories={post.categories.map((category) => category.slug )}/>
                        <Categories/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostDetails

export async function getStaticProps({ params }) { //params is the slug, It is unique url to specific resource
    const data = await getPostDetails(params.slug); // I think... forst get params (url) by getStaticPath and go to getStaticProps, after get all post with getPostDetails and match over current post using (params.slug) now we can get that post data. 
  
    return {
      props: { post: data }
    }
  }


//NextJS have dynamic URL like this you need to add getStaticPath. Thats special NextJS function that we can create Now.
export async function getStaticPaths(){
    const posts = await getPosts(); // getPosts is get form services

    //Now we can return an object containing paths
    return {
        paths: posts.map(({ node: { slug }}) => ({ params: { slug }})),
        fallback: false,
        //here we get a specific post but we can destructure that post to get the 
        // node out of it and then we can destructure one more time to get the slug. Now we simply want to return something.
        // params is set to slug.
    }
}