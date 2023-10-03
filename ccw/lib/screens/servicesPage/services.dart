import 'package:flutter/material.dart';
import 'package:latlong2/latlong.dart';
import 'package:flutter_map/flutter_map.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:ccw/consts/env.dart' show backendUrl;

class ServicePage extends StatefulWidget {
  @override
  _ServicePageState createState() => _ServicePageState();
}

class _ServicePageState extends State<ServicePage> {
  List<LatLng> routePoints = [LatLng( 21.1458004, 79.0881546)];
  List<Marker> dynamicMarkers = []; // List to store dynamic markers

  @override
  void initState() {
    super.initState();
    fetchLocations(); // Call the function to fetch locations on init
  }

  Future<void> fetchLocations() async {
    final response = await http.get(Uri.parse('$backendUrl/api/post/all-locations'));
    if (response.statusCode == 200) {
      final List<dynamic> data = json.decode(response.body);
      setState(() {
        dynamicMarkers = data.map((location) {
          final double latitude = location['latitude'];
          final double longitude = location['longitude'];
          return Marker(
            width: 50.0,
            height: 50.0,
            point: LatLng(latitude, longitude),
            builder: (ctx) => Container(
              child: Icon(
                Icons.location_on,
                color: Colors.blue, // You can set the marker color here
              ),
            ),
          );
        }).toList();
      });
    } else {
      // Handle error
      print('Failed to fetch locations');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(
          'Routing',
          style: TextStyle(fontSize: 20, fontWeight: FontWeight.w700),
        ),
        automaticallyImplyLeading: false, // Disable the back button
        backgroundColor: Colors.grey[500],
        // leading: IconButton(
        //   icon: Icon(Icons.arrow_back),
        //   onPressed: () {
        //     Navigator.pop(context);
        //   },
        // ),
      ),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(12.0),
          child: SingleChildScrollView(
            child: Column(
              children: [
                SizedBox(height: 10),
                SizedBox(
                  height: 700,
                  width: 400,
                  child: FlutterMap(
                    options: MapOptions(
                      center: routePoints[0],
                      zoom: 10,
                    ),
                    nonRotatedChildren: [
                      AttributionWidget.defaultWidget(
                        source: 'OpenStreetMap contributors',
                        onSourceTapped: null,
                      ),
                    ],
                    children: [
                      TileLayer(
                        urlTemplate: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
                        userAgentPackageName: 'com.example.app',
                      ),
                      MarkerLayer(
                        markers: [
                          // Add your dynamic markers here
                          ...dynamicMarkers,
                        ],
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
