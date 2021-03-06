import React,{Component} from 'react';
import CommentsHeader from './comments-header';
import CommentsContent from '../comments_content';
import {replaceUrl} from '../../js/util';

class Comments extends Component {
    constructor() {
        super();
        this.state = {
            shortComments: [],
            longComments: [],
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        fetch(`http://112.74.202.2:9999/api/4/story/${id}/short-comments`) // 获取短评论
            .then((response) => response.json())
            .then((data) => {
                data = JSON.parse(replaceUrl(JSON.stringify(data)));
                this.setState((preventState) => ({
                    shortComments: preventState.shortComments.concat(data.comments)
                }));
            });

        fetch(`http://112.74.202.2:9999/api/4/story/${id}/long-comments`) // 获取长评论
            .then((response) => response.json())
            .then((data) => {
                data = JSON.parse(replaceUrl(JSON.stringify(data)));
                this.setState((preventState) => ({
                    longComments: preventState.longComments.concat(data.comments)
                }));
            });
    }
    render() {
        const {shortComments, longComments} = this.state;
        const length = shortComments.length + longComments.length;
        return (
            <div className="comments">
                <CommentsHeader length={length}/>
                <CommentsContent s_comments={shortComments} l_comments={longComments}/>
            </div>
        )
    }
};

export default Comments;