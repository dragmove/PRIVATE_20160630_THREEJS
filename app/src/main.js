(function($) {
    "use strict";

    const React = require('react'),
        ReactDOM = require('react-dom');

    $(document).ready(init);

    function init() {
        console.log('init');
        /*
        var utils = require('./utils');
        console.log('utils.multi(10, 10) :', utils.multi(10, 10));

        var Greeting = require('./Greeting');
        ReactDOM.render(
            <Greeting name="hello, vuild" />,
            $('#wrapper').get(0)
        );
        */



        // TODO - https://facebook.github.io/react/docs/tutorial.html#adding-new-comments 진행할 차례



        var Comment = React.createClass({
            render: function() {
                return (
                    <div className="comment">
                        <h2 className="commentAuthor">
                            {this.props.company}
                        </h2>
                        {this.props.children}
                    </div>
                );
            }
        });

        var CommentList = React.createClass({
            render: function() {
                var commentNodes = this.props.data.map(function(comment) {
                    return (
                        <Comment company={comment.company} key={comment.id}>
                            {comment.position}
                        </Comment>
                    );
                });

                return (
                    <div className="commentList">
                        {commentNodes}
                    </div>
                );
            }
        });

        var CommentForm = React.createClass({
            getInitialState: function() {
                return {
                    author: '',
                    text: ''
                };
            },
            handleAuthorChange: function(e) {
                console.log('author :', e.target.value);

                this.setState({
                    author: e.target.value
                });
            },
            handleTextChange: function(e) {
                console.log('text :', e.target.value);

                this.setState({
                    text: e.target.value
                });
            },
            handleSubmit: function(e) {
                e.preventDefault();

                var author = this.state.author.trim();
                var text = this.state.text.trim();

                if(!text || !author) {
                    window.alert( 'oh no!' );
                    return;
                }

                this.props.onCommentSubmit({
                    author: author,
                    text: text
                });

                // TODO: send request to the server
                this.setState({
                    author: '',
                    text: ''
                });

            },
            render: function() {
                return (
                    <form className="commentForm" onSubmit={this.handleSubmit}>
                        <input type="text" placeholder="Your name" value={this.state.author} onChange={this.handleAuthorChange} />
                        <input type="text" placeholder="Say something" value={this.state.text} onChange={this.handleTextChange} />
                        <input type="submit" value="Post" />
                    </form>
                );
            }
        });

        var CommentBox = React.createClass({
            getInitialState: function() {
                return {
                    data: []
                };
            },
            componentWillMount: function() {

            },
            componentDidMount: function() {
                this.loadCommentsFromServer();
            },
            componentWillUpdate: function(nextProps, nextState) {

            },
            componentDidUpdate: function(prevProps, prevState) {

            },
            componentWillUnmount: function() {

            },

            handleCommentSubmit: function(comment) {
                // TODO: submit to the server and refresh the list
                console.log('comment :', comment);
                console.log('this.state.data :', this.state.data);
            },

            render: function() {
                return (
                    <div className="commentBox">
                        <h1>Comments</h1>
                        <CommentList data={this.state.data} />
                        <CommentForm onCommentSubmit={this.handleCommentSubmit}/>
                    </div>
                );
            },

            loadCommentsFromServer: function() {
                $.ajax({
                    url: this.props.url,
                    dataType: 'json',
                    cache: false,
                    success: function(data) {
                        console.log('data :', data);
                        this.setState({data: data});
                    }.bind(this),
                    error: function(xhr, status, err) {
                        console.error(this.props.url, status, err.toString());
                    }.bind(this)
                });
            }
        });

        ReactDOM.render(
            <CommentBox url="http://agile-oasis-5771.herokuapp.com/data/careers" />, // <CommentBox data={data} />,
            $('#content').get(0)
        );
    }
}(jQuery));