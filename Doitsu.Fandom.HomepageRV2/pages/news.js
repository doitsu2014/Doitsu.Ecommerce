import { Component } from "react";
import Link from "../components/Link"
import BlogService from "../services/BlogService"
export default class News extends Component {
  static async getInitialProps() {
    const baseData = await BlogService.get();
    return {
      blogs: baseData.data
    };
  }

  render() {
    const { blogs } = this.props;
    return (
      <div>
        <h1>News</h1>
        <ul>
          {blogs.map(entry => (
            <li key={entry.id}>
              <Link
                as={`/news/${entry.slug}`}
                href={`/news-detail?slug=${entry.slug}`}
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
