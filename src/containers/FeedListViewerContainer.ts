import { connect } from 'react-redux';

import { AppState } from '../reducers/AppState';
import { StateProps, DispatchProps, FeedListEditor, FeedSection } from '../components/FeedListEditor';
import { Feed } from '../models/Feed';
import { getFollowedFeeds, getKnownFeeds } from '../selectors/selectors';
import { TypedNavigation } from '../helpers/navigation';

const addSection = (title: string, feeds: Feed[]): FeedSection[] => {
    if (feeds.length > 0) {
        return [{
            title: `${title} (${feeds.length})`,
            data: feeds,
        }];
    }
    return [];
};

const mapStateToProps = (state: AppState, ownProps: { navigation: TypedNavigation, showExplore: boolean }): StateProps => {
    const navParamFeeds = ownProps.navigation.getParam<'FeedListViewerContainer', 'feeds'>('feeds');
    const navParamShowExplore = ownProps.navigation.getParam<'FeedListViewerContainer', 'showExplore'>('showExplore');
    const ownFeeds = navParamFeeds
        ? []
        : state.ownFeeds
    ;
    const followedFeeds = navParamFeeds
        ? navParamFeeds
        : getFollowedFeeds(state)
    ;
    const knownFeeds = navParamFeeds
        ? []
        : getKnownFeeds(state)
    ;

    const sections: FeedSection[] = ([] as FeedSection[]).concat(
        addSection('Channels you follow', followedFeeds),
        addSection('Your channels', ownFeeds),
        addSection('Other channels', knownFeeds),
    );

    return {
        sections,
        navigation: ownProps.navigation,
        gatewayAddress: state.settings.swarmGatewayAddress,
        title: 'All channels',
        showExplore: navParamShowExplore,
    };
};

export const mapDispatchToProps = (dispatch: any, ownProps: { navigation: TypedNavigation }): DispatchProps => {
    return {
        openExplore: () => {
            ownProps.navigation.navigate('CategoriesContainer', {});
        },
        onPressFeed: (feed: Feed) => {
            ownProps.navigation.navigate('FeedFromList', {
                feedUrl: feed.feedUrl,
                name: feed.name,
            });
        },
    };
};

export const FeedListViewerContainer = connect(mapStateToProps, mapDispatchToProps)(FeedListEditor);
