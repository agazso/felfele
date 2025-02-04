import * as React from 'react';
import { StyleSheet, ScrollView, Vibration } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Settings } from '../models/Settings';
import { Version } from '../Version';
import { Colors, ComponentColors } from '../styles';
import { NavigationHeader } from './NavigationHeader';
import { RowItem } from '../ui/buttons/RowButton';
import { SuperGridSectionList } from 'react-native-super-grid';
import { ReactNativeModelHelper } from '../models/ReactNativeModelHelper';
import { GridCard, getGridCardSize, GRID_SPACING } from '../ui/misc/GridCard';
import { RegularText, MediumText } from '../ui/misc/text';
import { RecentPostFeed } from '../social/api';
import { TabBarPlaceholder } from '../ui/misc/TabBarPlaceholder';
import { defaultImages } from '../defaultImages';
import { TypedNavigation } from '../helpers/navigation';
import { FragmentSafeAreaViewForTabBar } from '../ui/misc/FragmentSafeAreaView';
import { TouchableView } from './TouchableView';

export interface StateProps {
    navigation: TypedNavigation;
    settings: Settings;
    ownFeeds: RecentPostFeed[];
}

export interface DispatchProps {
    onSaveToCameraRollValueChange: (value: boolean) => void;
    onShowSquareImagesValueChange: (value: boolean) => void;
    onShowDebugMenuValueChange: (value: boolean) => void;
}

type Props = StateProps & DispatchProps;

const YOUR_FEEDS = 'YOUR CHANNELS';
const PREFERENCES_LABEL = 'PREFERENCES';

export const SettingsEditor = (props: Props) => {
    const version = 'Version: ' + Version;
    const modelHelper = new ReactNativeModelHelper(props.settings.swarmGatewayAddress);
    const itemDimension = getGridCardSize();
    return (
        <FragmentSafeAreaViewForTabBar>
            <NavigationHeader
                title='Settings'
            />
            <ScrollView style={{ backgroundColor: ComponentColors.BACKGROUND_COLOR }}>
                <SuperGridSectionList
                    style={{ flex: 1, backgroundColor: ComponentColors.BACKGROUND_COLOR }}
                    spacing={GRID_SPACING}
                    fixed={true}
                    itemDimension={itemDimension}
                    sections={[{
                        title: `${YOUR_FEEDS} ${props.ownFeeds.length}`,
                        data: props.ownFeeds,
                    }]}
                    renderItem={({ item }) => {
                        return (
                                <GridCard
                                    title={item.name}
                                    imageUri={modelHelper.getImageUri(item.authorImage)}
                                    onPress={() => props.navigation.navigate('FeedSettings', { feed: item as any })}
                                    size={itemDimension}
                                    defaultImage={defaultImages.defaultUser}
                                    modelHelper={modelHelper}
                                />
                        );
                    }}
                    renderSectionHeader={({ section }) => (
                        <MediumText style={styles.label}>{section.title}</MediumText>
                    )}
                />
                <RegularText
                    numberOfLines={1}
                    ellipsizeMode='tail'
                    style={styles.label}
                >
                    {PREFERENCES_LABEL}
                </RegularText>
                <RowItem
                    title='Save to Camera Roll'
                    switchState={props.settings.saveToCameraRoll}
                    onSwitchValueChange={props.onSaveToCameraRollValueChange}
                    buttonStyle='switch'
                />
                <RowItem
                    title='Send bug report'
                    buttonStyle='navigate'
                    onPress={() => props.navigation.navigate('BugReportView', {})}
                />
                <TouchableView
                    onLongPress={() => {
                        Vibration.vibrate(500, false);
                        props.onShowDebugMenuValueChange(!props.settings.showDebugMenu);
                    }}
                >
                    <RegularText style={styles.versionLabel}>{version}</RegularText>
                </TouchableView>
                { props.settings.showDebugMenu &&
                <RowItem
                    icon={
                        <Ionicons name='md-bug' size={24} color={ComponentColors.BUTTON_COLOR}/>
                    }
                    title='Debug menu'
                    buttonStyle='navigate'
                    onPress={() => props.navigation.navigate('Debug', {})}
                />
                }
            </ScrollView>
            <TabBarPlaceholder/>
        </FragmentSafeAreaViewForTabBar>
    );
};

const styles = StyleSheet.create({
    label: {
        paddingHorizontal: 10,
        paddingTop: 20,
        paddingBottom: 7,
        color: Colors.GRAY,
    },
    versionLabel: {
        color: ComponentColors.HINT_TEXT_COLOR,
        paddingTop: 25,
        paddingBottom: 10,
        paddingLeft: 10,
        fontSize: 14,
    },
});
