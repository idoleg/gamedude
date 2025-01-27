import React from 'react';

import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

import HotLinks from './HotLinks/hotLinks';
import PostLast from './PostLast/PostLast';

const GamePage = (props) => {
    const { game, posts } = props;

    if (game) {
        const { background } = game;
        const style={
            background: `linear-gradient(180deg, rgba(34, 34, 34, 0.7) 0%, rgba(34, 34, 34, 0.3) 100%), url(${ background }) no-repeat center top/cover fixed`
        };
        return (
            <div className='mainContainer'>
                <div className="gamepage-background" style={ style }> </div>
                <div className='mainWrapper'>
                    <h1>{ game.title }</h1>
                    <h4>Разработчик:  { game.developer }</h4>
                    <h4>Жанр: { game.category }</h4>

                    <HotLinks game={ game }/>

                    <PostLast posts={ posts }/>
                </div>
            </div>
        )
    } else {
        return (
            <div className="container center">
                <p>Загружаем...</p>
            </div>
        )
    }
};

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    const games = state.firestore.data.games;
    const posts = state.firestore.data.posts;

    const game = games ? games[id] : null;

    return {
        game,
        posts,
        auth: state.firebase.auth,
    }
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect(props => [
        {
            collection: 'games',
            doc: props.match.params.id
        },
        {
            collection: 'posts',
            where: [
                'gameId',
                '==',
                props.match.params.id
            ]
        }
    ])
)(GamePage);

