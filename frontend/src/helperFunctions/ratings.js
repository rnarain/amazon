import React, { Component } from 'react';
export function getRatings(x) {
    let ratings = [];
    for (let i = 0; i < 5; i++) {
        if (i < x) {
            ratings.push(<span className="glyphicon glyphicon-star"></span>);
        }
        else {
            ratings.push(<span className="glyphicon glyphicon-star-empty"></span>);
        }
    }
    return ratings;
}