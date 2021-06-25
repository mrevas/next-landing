/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'
import Layout from '../components/Layout'
import fs from 'fs'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import path from 'path'
import matter from 'gray-matter'
import marked from 'marked'

export default function Post({postData, content}) {
  return (
    <Layout>
      <Head>
        <title>The Bloggers</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <div id="main" className="alt">
        <section id="one">
            <div className="inner">
            <header className="major">
                <h1>{postData.title}</h1>
            </header>
            <span className="image main"><img src={`/assets/images/${postData.featured_image}`} alt="" /></span>
            <div dangerouslySetInnerHTML={{__html: content}} />
            </div>
        </section>
        </div>
    </Layout>
  )
}

export const getStaticPaths = async () => {
    const files = fs.readdirSync('posts');
    console.log("Files:", files);
    const paths = files.map(filename => ({
        params: {
            slug: filename.replace('.md','')
        }
    }))
    console.log('paths:', paths)
    return {
        paths,
        fallback: false
    }
}

export const getStaticProps = async ({params: {slug}}) => {
    const post = fs.readFileSync(path.join('posts',`${slug}.md`)).toString()
    const postData = matter(post)
    const content = marked(postData.content)
    console.log(content)
    console.log(postData.featured_image)
    return {
        props: {
            slug,
            content,
            postData: postData.data,
        }
    }
}