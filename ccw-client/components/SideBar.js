import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet ,Image} from 'react-native';

const Sidebar = ({ navigation }) => {
  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <View style={styles.sidebarContainer}>
        <View style={styles.profileContainer}>
            <Image
            source={require('../assets/favicon.png')}
            style={styles.profilePicture}
            />
            {/* <TouchableOpacity style={styles.editIcon} onPress={() => navigateToScreen('EditProfile')}>
            <FontAwesome name="pencil" size={18} color="#3498db" />
            </TouchableOpacity> */}
        </View>

      <View style={styles.blankRow} />

      <TouchableOpacity onPress={() => navigateToScreen('MyProfile')} style={styles.sidebarItem}>
        <Text style={styles.sidebarText}>My Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateToScreen('Documents')} style={styles.sidebarItem}>
        <Text style={styles.sidebarText}>Documents</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateToScreen('PickupHistory')} style={styles.sidebarItem}>
        <Text style={styles.sidebarText}>Pickup History</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateToScreen('About')} style={styles.sidebarItem}>
        <Text style={styles.sidebarText}>About</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateToScreen('HelpAndSupport')} style={styles.sidebarItem}>
        <Text style={styles.sidebarText}>Help and Support</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateToScreen('RateUs')} style={styles.sidebarItem}>
        <Text style={styles.sidebarText}>Rate Us</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateToScreen('SignOut')} style={styles.signOutButton}>
        <Text style={styles.signOutButtonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    sidebarContainer: {
        flex: 1,
        backgroundColor: 'white', // White background color
        paddingTop: 40,
        paddingHorizontal: 20,
      },
      profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
      },
      profilePicture: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 10,
      },
      editIcon: {
        padding: 5,
      },
      blankRow: {
        height: 20, // Adjust the height as needed
      },
      sidebarItem: {
        marginBottom: 20,
      },
      sidebarText: {
        fontSize: 18,
        color: 'black', // Black text color
      },
      signOutButton: {
        marginTop: 'auto', // Move to the bottom
      },
      signOutButtonText: {
        fontSize: 18,
        color: '#e74c3c', // Red text color
      },
});

export default Sidebar;
