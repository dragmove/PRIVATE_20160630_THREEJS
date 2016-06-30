let React = require('react'),
    CheckList = require('./Checklist');

module.exports = React.createClass({
    getInitialState() {
        return {
            showDetails: false
        };
    },

    toggleDetails(e) {
        this.setState({
            showDetails : !this.state.showDetails
        });
    },

	render: function() {
        let cardDetails;

        if(this.state.showDetails) {
            cardDetails = (
                <div className="card__details">
                    {this.props.description}
                    <CheckList cardId={this.props.id} tasks={this.props.tasks} taskCallbacks={this.props.taskCallbacks} />
                </div>
            );
        }

		return (
            <div className="card">
                <div className={this.state.showDetails ? "card__title card__title--is-open" : "card__title"} onClick={this.toggleDetails}>{this.props.title}</div>
                {cardDetails}
            </div>
		);

        /*
        <div className="card">
                <div className={this.state.showDetails ? "card__title card__title--is-open" : "card__title"} onClick={this.toggleDetails}>{this.props.title}</div>
                {cardDetails}
            </div>
            */
	}
});