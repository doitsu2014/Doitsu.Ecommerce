import { Component } from "react";

import Link from "../components/Link"
import BlogService from "../services/BlogService"

import Utils from "../utils"

export default class Notice extends Component {
    static async getInitialProps() {
        const baseData = await BlogService.get(Utils.BLOG_CATEGORY_CONSTS.NOTICE);
        return {
          blogs: baseData.data
        };
      }
    
  render() {
    const { blogs } = this.props;
    return (
      <div>
        <h1>Notice</h1>
        <ul>
          {blogs.map(entry => (
            <li key={entry.id}>
              <Link
                as={`/notice/${entry.slug}`}
                href={`/notice-detail?slug=${entry.slug}`}
              >
                <a>{`${entry.title}`}</a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
