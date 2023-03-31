import { View, Text, PermissionsAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'

import ReactNativeForegroundService from '@supersami/rn-foreground-service';
import RNLocation, { subscribeToHeadingUpdates } from 'react-native-location';


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
 
const taskid = 'taskid';

const RootScreen = () => {


  const is_task_running = ReactNativeForegroundService.is_task_running("taskidADD");
  console.log("is task id-----",is_task_running)

  const get_all_tasks = ReactNativeForegroundService.get_task("taskidADD");
  console.log("---------------------8u86878",get_all_tasks);

  

  const [locationU,setLocation] = useState('')

   useEffect(()=>{
   
    rootPermission();
   // _start_Task();
     console.log("--------------",locationU);
   },[is_task_running]);

   

   const _start_Task = async () =>{
    await ReactNativeForegroundService.add_task(task);
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

      let  task =null;

      console.log("------------------------------------>Permission Granted ");
              
      
        ReactNativeForegroundService.add_task(
          () => {
            RNLocation.requestPermission({
              ios: 'whenInUse',
              android: {
                detail: 'fine',
              },
            }).then((granted) => {
                  
                // if has permissions try to obtain location with RN location
                console.log('Location Permissions:----- ', granted);
                if(is_task_running == "true"){
                  console.log("----------------Task Yes",is_task_running);
                } 
                else{
                  console.log("-------------no task", is_task_running);
                }
                
                // for(let i=0; ReactNativeForegroundService.is_task_running;i++){

                  if (granted) {
                    // locationSubscription && locationSubscription();
                   
                      RNLocation.subscribeToLocationUpdates(
                        
                      ([locations]) => {
                        setLocation(locations)
                        console.log("--------------",locations);
                        
    
    
                        // locationSubscription();
                       //locationTimeout && clearTimeout(locationTimeout);
                        
                      },
                    );
                
                  } else {
                    locationSubscription && locationSubscription();
                    locationTimeout && clearTimeout(locationTimeout);
                    console.log('no permissions to obtain location');
                  }
                

              //  }
                
         
            });
          },
          
          {
            delay: 5000,
            onLoop: true,
            taskId: 'taskidADD',
            onError: (e) => console.log('Error logging:', e),
          },
        
        
          
        
        );
        

         
     
    }
  }

 




  return (
    <View>
      <Text>rootScreen</Text>
    </View>
  )
}

export default RootScreen;