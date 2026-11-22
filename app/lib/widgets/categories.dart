// // ignore_for_file: unused_import, file_names
// import 'package:flutter/material.dart';
// import 'package:provider/provider.dart';
// import 'package:snackki_coffee_app/main.dart';
// import 'package:snackki_coffee_app/provider/homecategory.dart';
// import 'package:snackki_coffee_app/screens/home/products.dart';
// import 'package:snackki_coffee_app/utils/colors.dart';

// class Categories extends StatelessWidget {
//   const Categories({super.key});

//   @override
//   Widget build(BuildContext context) {
//     return Column(
//       children: [
//         Padding(
//           padding: const EdgeInsets.symmetric(horizontal: 20),
//           child: Row(
//             mainAxisAlignment: MainAxisAlignment.spaceBetween,
//             children: const [
//               Text(
//                 "Kategorien",
//                 style: TextStyle(
//                   color: mainColor,
//                   fontSize: 25,
//                   fontWeight: FontWeight.w500,
//                 ),
//               ),
//             ],
//           ),
//         ),
//         const SizedBox(height: 15),
//         SingleChildScrollView(
//           scrollDirection: Axis.horizontal,
//           child: Row(
//             children: [
//               InkWell(
//                 onTap: () {
//                   Provider.of<HomeCategoryProvider>(context, listen: false)
//                       .changeCategory("Kaffee");
//                 },
//                 child: Container(
//                   padding: EdgeInsets.all(8),
//                   margin: EdgeInsets.all(8),
//                   decoration: BoxDecoration(
//                       color: thirdColor,
//                       borderRadius: BorderRadius.circular(16)),
//                   child: ClipRRect(
//                     borderRadius: BorderRadius.circular(15),
//                     child: Image.asset(
//                       "assets/images/kahve_cekirdegi.png",
//                       height: 70,
//                       width: 70,
//                       fit: BoxFit.cover,
//                     ),
//                   ),
//                 ),
//               ),
//               InkWell(
//                 onTap: () {
//                   Provider.of<HomeCategoryProvider>(context, listen: false)
//                       .changeCategory("Instant");
//                 },
//                 child: Container(
//                   padding: EdgeInsets.all(8),
//                   margin: EdgeInsets.all(8),
//                   decoration: BoxDecoration(
//                       color: thirdColor,
//                       borderRadius: BorderRadius.circular(16)),
//                   child: ClipRRect(
//                     borderRadius: BorderRadius.circular(15),
//                     child: Image.asset(
//                       "assets/images/kahve_bardagi.png",
//                       height: 70,
//                       width: 70,
//                       fit: BoxFit.cover,
//                     ),
//                   ),
//                 ),
//               ),
//               InkWell(
//                   onTap: () {
//                     Provider.of<HomeCategoryProvider>(context, listen: false)
//                         .changeCategory("Tee");
//                   },
//                   child: Container(
//                     padding: EdgeInsets.all(8),
//                     margin: EdgeInsets.all(8),
//                     decoration: BoxDecoration(
//                         color: thirdColor,
//                         borderRadius: BorderRadius.circular(16)),
//                     child: ClipRRect(
//                       borderRadius: BorderRadius.circular(15),
//                       child: Image.asset(
//                         "assets/images/kahve_bardagi_2.png",
//                         height: 70,
//                         width: 70,
//                         fit: BoxFit.cover,
//                       ),
//                     ),
//                   )),
//               InkWell(
//                   onTap: () {
//                     Provider.of<HomeCategoryProvider>(context, listen: false)
//                         .changeCategory("Zubehör");
//                   },
//                   child: Container(
//                     padding: EdgeInsets.all(8),
//                     margin: EdgeInsets.all(8),
//                     decoration: BoxDecoration(
//                         color: thirdColor,
//                         borderRadius: BorderRadius.circular(16)),
//                     child: ClipRRect(
//                       borderRadius: BorderRadius.circular(15),
//                       child: Image.asset(
//                         "assets/images/kahve_makinesi.png",
//                         height: 70,
//                         width: 70,
//                         fit: BoxFit.cover,
//                       ),
//                     ),
//                   )),
//             ],
//           ),
//         ),
//       ],
//     );
//   }
// }
