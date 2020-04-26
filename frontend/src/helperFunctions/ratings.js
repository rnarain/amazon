import React, { Component } from 'react';
export class StarRating extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ratings: [],
            selected_rating: props.ratings
        };

    }

    componentDidMount() {
        this.getRatings(this.state.selected_rating);
    }

    render() {
        return (
            <div>
                {this.state.ratings}
            </div>
        );
    }

    getRatings(x) {
        console.log('X ', x);
        let ratings = [];
        for (let i = 0; i < 5; i++) {
            if (i < x) {
                ratings.push(<span className="glyphicon glyphicon-star" ></span>);
            }
            else {
                if (this.props.editable === true)
                    ratings.push(<span className="glyphicon glyphicon-star-empty" onClick={() => { this.onClick(i) }}></span>);
                else
                    ratings.push(<span className="glyphicon glyphicon-star-empty" ></span>);

            }
        }
        debugger;
        this.setState({ ratings, selected_rating: x });
        if (this.props.editable === true)
            this.props.parentCallback(x);
    };

    onClick(i) {
        debugger;
        return this.getRatings(i + 1);
    }
}
