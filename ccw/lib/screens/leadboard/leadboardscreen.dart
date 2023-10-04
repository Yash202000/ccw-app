import 'package:ccw/screens/newsFeedPage/widgets/widgetFeed.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:ccw/consts/env.dart' show backendUrl;

class LeaderboardWidget extends StatelessWidget {
  final List<Map<String, dynamic>> leaderboardData;

  LeaderboardWidget(this.leaderboardData);

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Row(
            children: [
              // Icon(Icons.monetization_on, color: Colors.green), // Add an icon
              SizedBox(width: 8), // Add spacing
              Text(
                'Leaderboard',
                style: TextStyle(
                  fontSize: 20,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ],
          ),
        SizedBox(height: 10),
        ListView.builder(
          shrinkWrap: true,
          itemCount: leaderboardData.length,
          itemBuilder: (context, index) {
            final user = leaderboardData[index];
            final medal = index < 3 ? ['🥇', '🥈', '🥉'][index] : '${index + 1}';
            return ListTile(
              leading: Text(medal), // Display medal or index
              title: Text('${user['profile']['firstName']} ${user['profile']['LastName']}'),
            );
          },
        ),
      ],
    );
  }

}


class LeaderboardScreen extends StatefulWidget {
  @override
  _LeaderboardScreenState createState() => _LeaderboardScreenState();
}

class _LeaderboardScreenState extends State<LeaderboardScreen> {
  List<Map<String, dynamic>> leaderboardData = [];

  @override
  void initState() {
    super.initState();
    fetchData(); // Fetch data when the widget is initialized
  }

  Future<void> fetchData() async {
    try {
      print('$backendUrl/api/leadboard');
      final response = await http.get(Uri.parse('$backendUrl/api/leadboard'));
      print(response.body);
      if (response.statusCode == 200) {
        final jsonData = json.decode(response.body);
        setState(() {
          leaderboardData = List<Map<String, dynamic>>.from(jsonData);
        });
      } else {
        // Handle error when API request fails
        print('Failed to fetch data: ${response.statusCode}');
      }
    } catch (error) {
      // Handle any exceptions that occur
      print('Error fetching data: $error');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        title: actionBarRow(context),
        centerTitle: false,
        elevation: 0,
        automaticallyImplyLeading: false,
        backgroundColor: Colors.white,
      ),
      body: SingleChildScrollView(
        padding: EdgeInsets.all(20.0),
        child: Column(
          children: [
            LeaderboardWidget(leaderboardData),
          ],
        ),
      ),
    );
  }
}
