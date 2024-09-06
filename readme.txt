npx react-native run-android

npx react-native doctor

cd android && ./gradlew clean && cd ..

gradlew.bat clean

gradlew.bat app:installDebug -PreactNativeDevServerPort=8081

8c17c838-c4d6-4856-8879-5439e5f10cb3 FCM configuration


# clean gradlew
- android
cd android
./gradlew clean
cd ..
npx react-native run-android

-ios 
cd ios
xcodebuild clean
cd ..
npx react-native run-ios


npx react-native start --reset-cache
