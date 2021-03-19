import React, {useEffect, useState} from 'react';
import {NextPage} from 'next';
import {useRouter} from 'next/router'

import {ContentfulService} from '../core/contentful';

import {BlogPost} from '../interfaces/post';

import Layout from '../shared/components/layout';
import Card from '../shared/components/card';
import Paginator from '../shared/components/paginator';
import TagFilters from "../shared/components/tag-filters";

const calculateRange = (length) => Array.from({length}, (v, k) => k + 1);

const cards = (entries) => entries.map((entry, index) => (<Card info={entry} key={index}/>));

type Props = {
    entries: BlogPost[];
    tags: { id: string, name: string }[];
    url: any;
    total: number;
    skip: number;
    limit: number;
    page?: number;
}

const IndexPage: NextPage = (props: Props) => {
    const router = useRouter();
    const entries = props.entries.length ? props.entries : [];
    const tags = props.tags || [];
    const total = props.total;

    const limit = props.limit;
    const rangeLimit = Math.ceil(total / limit);
    const range = calculateRange(rangeLimit);

    const [page, updatePage] = useState(!!props.page ? props.page : 1);
    const [tag, updateTag] = useState('');

    useEffect(() => {
        void router.push({pathname: '/', query: {page: page, tag: tag}});
    }, [page, tag]);

    const handleTagChosen = (tag) => {
        updatePage(1);
        updateTag(tag);
    };

    return (
        <Layout>
            <div className="container">
                <div className="blogposts">
                    <h1 className="blogposts__header">Latest posts</h1>
                    <div className="cards-deck">
                        {cards(entries)}
                    </div>
                </div>
                <div className="sidenav">
                    <TagFilters tags={tags} updatePage={handleTagChosen} selectedTagId={tag}/>
                </div>
                <div className="pagination">
                    <Paginator handlePaginationChange={(event) => updatePage(event)} range={range} skip={page}/>
                </div>
            </div>
        </Layout>
    )
};

IndexPage.getInitialProps = async ({query}) => {
    
    const contentfulService = new ContentfulService();
    
    let page: number = 1;

    if (query.page) {
        page = parseInt(query.page + '');
    }


    const limit = 3;
    const {entries, total, skip, limit} = await contentfulService.getBlogPostEntries({
        tag: query.tag ? query.tag.toString() : '',
        skip: (page - 1) * limit,
        limit,
    });

    const {tags} = await contentfulService.getAllTags();

    return {page, tags, entries, total, skip, limit};
};

export default IndexPage;