import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:snackki_coffee_app/provider/basket.dart';
import 'package:snackki_coffee_app/screens/home/home.dart';
import 'package:snackki_coffee_app/screens/settings/settings.dart';
import 'package:snackki_coffee_app/screens/shopping/shopping.dart';
import 'package:snackki_coffee_app/utils/colors.dart';
import 'package:snackki_coffee_app/widgets/drawer.dart';

class Layout extends StatefulWidget {
  const Layout({super.key});

  @override
  State<Layout> createState() => _LayoutState();
}

class _LayoutState extends State<Layout> {
  int _page = 1;
  final _page1 = GlobalKey<NavigatorState>();
  final _page2 = GlobalKey<NavigatorState>();
  final _page3 = GlobalKey<NavigatorState>();
  late PageController pageController; // for tabs animation

  @override
  void initState() {
    super.initState();
    pageController = PageController(initialPage: 1);
  }

  @override
  void dispose() {
    super.dispose();
    pageController.dispose();
  }

  void navigationTapped(int page) {
    setState(() {
      _page = page;
    });
  }

  @override
  Widget build(BuildContext context) {
    Size sizeMedia;
    double height, width;
    sizeMedia = MediaQuery.of(context).size;
    height = sizeMedia.height;
    width = sizeMedia.width;
    return PopScope(
      canPop: false,
      onPopInvokedWithResult: (didPop, result) {
        if (!didPop) _page1.currentState!.maybePop(context);
      },
      child: Scaffold(
        appBar: AppBar(
          title: const Text(
            "SNACKKI",
            style: TextStyle(color: primaryColor),
          ),
          backgroundColor: mainColor,
          toolbarHeight: height / 10,
          elevation: 0,
          iconTheme: IconThemeData(color: primaryColor),
          leadingWidth: width / 2.75,
          actions: [
            Builder(
              builder: (BuildContext context) {
                return IconButton(
                  icon: const Icon(
                    Icons.menu,
                  ),
                  onPressed: () {
                    Scaffold.of(context).openEndDrawer();
                  },
                  tooltip:
                      MaterialLocalizations.of(context).openAppDrawerTooltip,
                );
              },
            ),
          ],
          leading: Container(
            height: height / 10,
            width: width,
            margin: EdgeInsets.only(left: width / 20),
            child: Image.asset(
              "assets/images/snackki_logo.png",
              height: height / 10,
              alignment: Alignment.centerLeft,
              width: width / 2.75,
            ),
          ),
        ),
        endDrawer: MyDrawer(),
        body: IndexedStack(
          index: _page,
          children: <Widget>[
            Navigator(
              key: _page1,
              onGenerateRoute: (route) => MaterialPageRoute(
                settings: route,
                builder: (context) => ShoppingPage(),
              ),
            ),
            Navigator(
              key: _page2,
              onGenerateRoute: (route) => MaterialPageRoute(
                settings: route,
                builder: (context) => HomePage(),
              ),
            ),
            Navigator(
              key: _page3,
              onGenerateRoute: (route) => MaterialPageRoute(
                settings: route,
                builder: (context) => SettingsPage(),
              ),
            ),
          ],
        ),
        bottomNavigationBar: BottomNavigationBar(
          showSelectedLabels: false,
          showUnselectedLabels: false,
          elevation: 0,
          iconSize: 16,
          fixedColor: primaryColor,
          items: [
            BottomNavigationBarItem(
                icon: SizedBox(
                  width: 40,
                  child: Stack(children: [
                    Icon(Icons.shopping_cart,
                        size: 30,
                        color: (_page == 0) ? secondaryColor : greyColor),
                    Consumer<BasketProvider>(
                      builder: (context, value, child) => value
                              .listOfOrders.isEmpty
                          ? Container()
                          : Align(
                              alignment: Alignment.topRight,
                              child: Container(
                                decoration: BoxDecoration(
                                    color: fourthColor,
                                    borderRadius:
                                        BorderRadius.circular(borderRadius)),
                                child: Padding(
                                  padding: const EdgeInsets.all(3.0),
                                  child: Text(
                                    value.listOfOrders.length.toString(),
                                    style: TextStyle(
                                      color: primaryColor,
                                    ),
                                  ),
                                ),
                              )),
                    )
                  ]),
                ),
                label: ""),
            BottomNavigationBarItem(
                icon: Icon(Icons.home_outlined,
                    size: 30, color: (_page == 1) ? secondaryColor : greyColor),
                label: ""),
            BottomNavigationBarItem(
                icon: Icon(Icons.person_outline,
                    size: 30, color: (_page == 2) ? secondaryColor : greyColor),
                label: "")
          ],
          currentIndex: _page,
          backgroundColor: greyColor.withValues(alpha: 0.2),
          onTap: navigationTapped,
        ),
      ),
    );
  }
}

class MySearchDelegate extends SearchDelegate {
  @override
  String get searchFieldLabel => 'Suchen';

  @override
  Widget? buildLeading(context) => IconButton(
      onPressed: () {
        close(context, null);
      },
      icon: Icon(
        Icons.arrow_back_ios,
        color: greyColor,
      ));

  @override
  Widget buildResults(BuildContext context) {
    // TODO: implement buildResults
    return Container();
  }

  @override
  Widget buildSuggestions(BuildContext context) {
    // TODO: implement buildSuggestions
    return Container();
  }

  @override
  List<Widget>? buildActions(BuildContext context) => [
        IconButton(
            onPressed: () {
              close(context, null);
            },
            icon: Icon(Icons.clear))
      ];
}
