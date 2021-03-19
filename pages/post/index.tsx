import { NextPage } from 'next';
import React from 'react';
import ReactMarkdown from 'react-markdown';

import './styles.css';

import { ContentfulService } from '../../core/contentful';

import Layout from '../../shared/components/layout/layout.component';

import { BlogPost } from '../../interfaces/post';

type Props = {
    article: BlogPost;
};
const PostPage: NextPage = (props: Props) => {

    return (
        <Layout>
            <div className="post-container" id="post-container">
                <div className="post-header">
                    <h1>{props.article.title}</h1>
                    <div className="author">
                        <p>Written by {props.article.author.name}</p>
                    </div>
                </div>
                <ReactMarkdown className="markdown" source={props.article.body}/>

            </div>
        </Layout>
    );
};


PostPage.getInitialProps = async ({query}) => {

    // define contentful service instance
    const contentfulService = new ContentfulService();

    const {post} = query;
    const article = await contentfulService.getPostBySlug(post);

    return {article};
};

export default PostPage;