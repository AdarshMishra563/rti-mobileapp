import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text, TouchableOpacity,
    View
} from 'react-native';

const CitizenVoiceScreen = ({ navigation }) => {

    const [selectedCategory, setSelectedCategory] = useState('Aadhar');

    const categories = [
        { key: 'Aadhar', label: 'Aadhar Issue', icon: <Ionicons name="videocam" size={40} color="#000" /> },
        { key: 'Govt', label: 'Govt office', icon: <MaterialCommunityIcons name="office-building" size={40} color="#000" /> },
        { key: 'Municipal', label: 'Municipal', icon: <FontAwesome5 name="archway" size={40} color="#000" /> },
    ];

    const bottomTabs = [
        { key: 'Home', label: 'Home', icon: <Ionicons name="home" size={24} /> },
        { key: 'JoinRTI', label: 'Join RTI', icon: <Ionicons name="create-outline" size={24} /> },
        { key: 'AddPost', label: 'Add Post', icon: <Ionicons name="add-circle-outline" size={24} /> },
        { key: 'EPaper', label: 'E-Paper', icon: <Ionicons name="book-outline" size={24} /> },
        { key: 'Profile', label: 'Profile', icon: <Ionicons name="person-outline" size={24} /> },
    ];

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Citizen Voice</Text>
                <View style={{ width: 24 }} /> {/* placeholder for right spacing */}
            </View>

            {/* Categories */}
            <View style={styles.categoriesContainer}>
                {categories.map((cat) => {
                    const isSelected = selectedCategory === cat.key;
                    return (
                        <TouchableOpacity
                            key={cat.key}
                            style={[styles.categoryBox, isSelected && styles.categoryBoxSelected]}
                            onPress={() => setSelectedCategory(cat.key)}
                            activeOpacity={0.7}
                        >
                            <View style={styles.iconWrapper}>
                                {cat.icon}
                            </View>
                            <Text style={styles.categoryLabel}>{cat.label}</Text>
                        </TouchableOpacity>
                    );
                })}
            </View>

            {/* Bottom Tabs */}
            <View style={styles.bottomTabsContainer}>
                {bottomTabs.map((tab) => {
                    const isActive = tab.key === 'Home'; // Home tab active
                    return (
                        <TouchableOpacity
                            key={tab.key}
                            style={styles.tabItem}
                            onPress={() => {
                                // You can add navigation here e.g.
                                // navigation.navigate(tab.key + 'Screen');
                            }}
                            activeOpacity={0.7}
                        >
                            {React.cloneElement(tab.icon, {
                                color: isActive ? '#0077B6' : '#999',
                            })}
                            <Text style={[styles.tabLabel, isActive && { color: '#0077B6' }]}>{tab.label}</Text>
                        </TouchableOpacity>
                    );
                })}
            </View>

            {/* Fixed Bottom Tab Bar */}
            <View style={styles.tabBar}>
                <TouchableOpacity onPress={() => navigation.navigate('FullNews')} style={styles.tabItem}>
                    <Ionicons name="home-outline" size={24} color="#aaa" />
                    <Text style={styles.tabLabel}>Home</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('AddPostScreen')} style={styles.tabItem}>
                    <Ionicons name="add-circle" size={28} color="#aaa" />
                    <Text style={styles.tabLabel}>Add Post</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('JoinRTIScreen')} style={styles.tabItem}>
                    <Ionicons name="create-outline" size={24} color="#aaa" />
                    <Text style={styles.tabLabel}>Join RTI</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('EpaperScreen')} style={styles.tabItem}>
                    <Ionicons name="book-outline" size={24} color="#aaa" />
                    <Text style={styles.tabLabel}>E-Paper</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('ProfilePreview')} style={styles.tabItem}>
                    <Ionicons name="person" size={24} color="#aaa" />
                    <Text style={styles.tabLabel}>Profile</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default CitizenVoiceScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        height: 56,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
    },
    headerTitle: {
        fontWeight: '600',
        fontSize: 18,
        color: '#000',
    },
    categoriesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 30,
        paddingHorizontal: 10,
    },
    categoryBox: {
        width: 90,
        height: 90,
        borderRadius: 16,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 6, // for Android shadow
        shadowColor: '#000', // iOS shadow
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    categoryBoxSelected: {
        elevation: 12,
        shadowOpacity: 0.35,
        backgroundColor: '#f0f8ff',
    },
    iconWrapper: {
        marginBottom: 8,
    },
    categoryLabel: {
        fontSize: 13,
        color: '#666',
        textAlign: 'center',
    },
    bottomTabsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: 56,
        borderTopColor: '#ddd',
        borderTopWidth: 1,
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: '#fff',
    },
    tabBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
        borderTopWidth: 1,
        borderColor: '#eee',
        backgroundColor: '#fff',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
    },
    tabItem: {
        alignItems: 'center',
    },
    tabLabel: {
        fontSize: 12,
        color: '#aaa',
        marginTop: 2,
    },
});
