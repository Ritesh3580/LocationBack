import { View, Text, PermissionsAndroid, LogBox, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'

import ReactNativeForegroundService from '@supersami/rn-foreground-service';
import RNLocation, { subscribeToHeadingUpdates } from 'react-native-location';
import BackgroundTimer from 'react-native-background-timer';


import Geolocation from '@react-native-community/geolocation';




const RootScreen = () => {




  const configANd = async ()=>{
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
      allowsBackgroundLocationUpdates: true,
      headingFilter: 1, // Degrees
      headingOrientation: 'portrait',
      pausesLocationUpdatesAutomatically: false,
      showsBackgroundLocationIndicator: true,
    });

  }
 
  
  
ReactNativeForegroundService.register();

ReactNativeForegroundService.start({

    id: 144,
    title: "Foreground Service",
    message: "locationU",
   
    
  });


let locationSubscription = null;
let locationTimeout = null;


  const is_task_running = ReactNativeForegroundService.is_task_running("taskidADD");
  console.log("is task id-----",is_task_running)
    

  const get_all_tasks = ReactNativeForegroundService.get_task("taskidADD");
  console.log("---------------------8u86878",get_all_tasks);

  const [coordinate, setCoordinate] = useState(null);

  const [locationU,setLocation] = useState('');

   useEffect(()=>{
   
   
     BackgroundTimer.runBackgroundTimer(() => { 
      //code that will be called every 3 seconds 
  
      rootPermission();
      GeoLoc();

      console.log("-------------Location-",locationU);
      }, 
      20000);


    
   });


   
  //  const GeoLoc = async () =>{
  //   Geolocation.getCurrentPosition(async info =>{
  //     setCoordinate(info);
  //     console.log("----------------------------------090900009",info);
  //   })
  //  }
   

  


   const rootPermission = async () =>{
   
     
    configANd();
    const backgroundgranted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
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
              

      
        ReactNativeForegroundService.add_task(
          () => {
            RNLocation.requestPermission({
              ios: 'whenInUse',
              android: {
                detail: 'fine',
              
              },
            }).then((granted) => {

              // const  Req =()=>{
              //   RNLocation.configure({
              //     distanceFilter: 100, // Meters
              //     desiredAccuracy: {
              //       ios: 'best',
              //       android: 'balancedPowerAccuracy',
              //     },
              //     // Android only
              //     androidProvider: 'auto',
              //     interval: 5000, // Milliseconds
              //     fastestInterval: 10000, // Milliseconds
              //     maxWaitTime: 5000, // Milliseconds
              //     // iOS Only
              //     activityType: 'other',
              //     allowsBackgroundLocationUpdates: true,
              //     headingFilter: 1, // Degrees
              //     headingOrientation: 'portrait',
              //     pausesLocationUpdatesAutomatically: false,
              //     showsBackgroundLocationIndicator: true,
              //   });
              // }

              const is_task_runnin = ReactNativeForegroundService.is_task_running("taskidADD");
             
                  
                // if has permissions try to obtain location with RN location
                console.log('Location Permissions:----- ', granted);

                // for(let i=0; backgroundgranted.is_task_running("taskidADD");i++){
                //   console.log("-----------");
                // }

                if(is_task_runnin){
                  console.log("----------------Task Yes",is_task_runnin);
                   //Req();

                  if (granted) {
                    // locationSubscription && locationSubscription();
                   console.log("---------------888",is_task_runnin);
                      const loct = RNLocation.subscribeToLocationUpdates(
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
                } 
                else{
                  console.log("-------------no task", is_task_runnin);
                }
                
                // for(let i=0; ReactNativeForegroundService.is_task_running;i++){

                
                

              //  }
                
         
            });
          },
          
          {
            delay: 20000,
            onLoop: true,
            taskId: 'taskidADD',
            onError: (e) => console.log('Error logging:', e),
          },
        
        );
        
    }
  }





  return (
   <SafeAreaView>
    <View style={{marginTop:100}}>
      <Text style={{textAlign:'center'}}>Latitude.........{locationU.latitude}</Text>
      <Text style={{textAlign:'center', marginTop:50}}>Latitude.........{locationU.longitude}</Text>
    </View>
   </SafeAreaView>
  )
}

export default RootScreen;