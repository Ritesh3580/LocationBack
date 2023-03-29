import { View, Text, PermissionsAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'

import ReactNativeForegroundService from '@supersami/rn-foreground-service';
import RNLocation from 'react-native-location';


ReactNativeForegroundService.register();

ReactNativeForegroundService.start({

    id: 144,
    title: "Foreground Service",
    message: "you are online!......",
   
    
  });

RNLocation.configure({
  distanceFilter: 100, // Meters
  desiredAccuracy: {
    ios: 'best',
    android: 'balancedPowerAccuracy',
  },
  // Android only
  androidProvider: 'auto',
  interval: 5000, // Milliseconds
  fastestInterval: 10000, // Milliseconds
  maxWaitTime: 5000, // Milliseconds
  // iOS Only
  activityType: 'other',
  allowsBackgroundLocationUpdates: false,
  headingFilter: 1, // Degrees
  headingOrientation: 'portrait',
  pausesLocationUpdatesAutomatically: false,
  showsBackgroundLocationIndicator: false,
});
let locationSubscription = null;
let locationTimeout = null;

const RootScreen = () => {


  const is_task_running = ReactNativeForegroundService.is_task_running();

  const [locationU,setLocation] = useState('')

   useEffect(()=>{
   
    rootPermission();
   // _start_Task();


     console.log("--------------",locationU);
   },[is_task_running]);



   const _start_Task = async () =>{
    await ReactNativeForegroundService.update_task(task);
   }

   const rootPermission = async () =>{
     
    const backgroundgranted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
      {
        title: 'Background Location Permission',
        message:
          'We need access to your location ' +
          'so you can get live quality updates.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (backgroundgranted === PermissionsAndroid.RESULTS.GRANTED) {
      //do your thing!

      console.log("------------------------------------>Permission Granted ");
      
      if(ReactNativeForegroundService.is_task_running()){

        
      
        ReactNativeForegroundService.add_task(
          () => {
            RNLocation.requestPermission({
              ios: 'whenInUse',
              android: {
                detail: 'fine',
              },
            }).then((granted) => {
              
              for(let i=0; ReactNativeForegroundService.is_task_running;i++){
                



                console.log('Location Permissions: ', granted);
                // if has permissions try to obtain location with RN location
  
                if (granted) {
                  // locationSubscription && locationSubscription();
                    RNLocation.subscribeToLocationUpdates(
                      
                    ([locations]) => {
                      setLocation(locations)
                      console.log("--------------",locations);
                      
  
  
                      // locationSubscription();
                     // locationTimeout && clearTimeout(locationTimeout);
                      
                    },
                  );
                } else {
                  locationSubscription && locationSubscription();
                  locationTimeout && clearTimeout(locationTimeout);
                  console.log('no permissions to obtain location');
                }
              }
         
            });
          },
          {
            delay: 5000,
            onLoop: true,
            taskId: 'taskid',
            onError: (e) => console.log('Error logging:', e),
          },
        );

      }
     
    }
  }

  const task = async taskData =>{
    

  }




  return (
    <View>
      <Text>rootScreen</Text>
    </View>
  )
}

export default RootScreen;