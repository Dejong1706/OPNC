package com.example.app;

import androidx.annotation.NonNull;

import com.minew.beacon.BeaconValueIndex;
import com.minew.beacon.BluetoothState;
import com.minew.beacon.MinewBeacon;
import com.minew.beacon.MinewBeaconManager;
import com.minew.beacon.MinewBeaconManagerListener;

import io.flutter.embedding.android.FlutterActivity;
import io.flutter.embedding.engine.FlutterEngine;
import io.flutter.plugin.common.MethodChannel;

import android.util.Log;
import android.bluetooth.BluetoothAdapter;
import android.content.Intent;
import android.os.Bundle;
import android.os.Build.VERSION;
import android.os.Build.VERSION_CODES;
import android.os.Build;

import android.Manifest;
import java.util.List;
import java.util.Collections;
// import java.util.ArrayList;
// import androidx.core.app.ActivityCompat;
// import androidx.core.content.ContextCompat;
// import android.content.pm.PackageManager;



public class MainActivity extends FlutterActivity {
    private static final String CHANNEL = "samples.flutter.dev/battery";
    private static final int REQUEST_ACCESS_FINE_LOCATION = 1000;
    private static final int REQUEST_ENABLE_BT = 2;

    private MinewBeaconManager mMinewBeaconManager;
    private boolean isScanning;
    private int state;
    UserRssi comp = new UserRssi();

    public String deviceUUID;
    public String errorMessage;

    @Override
    public void configureFlutterEngine(@NonNull FlutterEngine flutterEngine) {
        super.configureFlutterEngine(flutterEngine);
        new MethodChannel(flutterEngine.getDartExecutor().getBinaryMessenger(), CHANNEL)
                .setMethodCallHandler(
                        (call, result) -> {
                            if (call.method.equals("getBeaconId")) {
                                if(errorMessage != null){
                                    result.success(errorMessage);
                                }
                                if (deviceUUID != null) {
                                    result.success(deviceUUID);
                                } else {
                                    result.error("UNAVAILABLE", "no Search BeaconDevice.", null);
                                }
                            } else if(call.method.equals("initBeacon")){
                                init();
                                if(mMinewBeaconManager != null){
                                    result.success("success");
                                }else {
                                    result.error("UNAVAILABLE", "no init", null);
                                }

                            }else {
                                result.notImplemented();
                            }
                        }
                );
    }

    private void init(){
        mMinewBeaconManager = MinewBeaconManager.getInstance(this);
        BluetoothState bluetoothState = mMinewBeaconManager.checkBluetoothState();
        if (mMinewBeaconManager != null) {
            switch (bluetoothState) {
                case BluetoothStateNotSupported:
                    errorMessage = "BluetoothStateNotSupported";
                    break;
                case BluetoothStatePowerOff:
                    showBLEDialog();
                    errorMessage = "BluetoothStatePowerOff";
                    return;
                case BluetoothStatePowerOn:
                    break;
            }
        }
        if (isScanning) {
            isScanning = false;
            if (mMinewBeaconManager != null) {
                mMinewBeaconManager.stopScan();
            }
        } else {
            isScanning = true;
            try {
                mMinewBeaconManager.startScan();
            } catch (Exception e) {
                errorMessage = e.getMessage();
            }
        }
        try{
            mMinewBeaconManager.setDeviceManagerDelegateListener(new MinewBeaconManagerListener() {
                /**
                 *   if the manager find some new beacon, it will call back this method.
                 *
                 *  @param minewBeacons  new beacons the manager scanned
                 */
                @Override
                public void onAppearBeacons(List<MinewBeacon> minewBeacons) {
                    
                }
    
                /**
                 *  if a beacon didn't update data in 10 seconds, we think this beacon is out of rang, the manager will call back this method.
                 *
                 *  @param minewBeacons beacons out of range
                 */
                @Override
                public void onDisappearBeacons(List<MinewBeacon> minewBeacons) {
                    /*for (MinewBeacon minewBeacon : minewBeacons) {
                        String deviceName = minewBeacon.getBeaconValue(BeaconValueIndex.MinewBeaconValueIndex_Name).getStringValue();
                        Toast.makeText(getApplicationContext(), deviceName + "  out range", Toast.LENGTH_SHORT).show();
                    }*/
                }
    
                /**
                 *  the manager calls back this method every 1 seconds, you can get all scanned beacons.
                 *
                 *  @param minewBeacons all scanned beacons
                 */
                @Override
                public void onRangeBeacons(final List<MinewBeacon> minewBeacons) {
                    runOnUiThread(new Runnable() {
                        @Override
                        public void run() {
                            if(!minewBeacons.isEmpty()){
                                Collections.sort(minewBeacons, comp);
                                deviceUUID = minewBeacons.get(0).getBeaconValue(BeaconValueIndex.MinewBeaconValueIndex_MAC).getStringValue();
                                //float deviceInRange = minewBeacons.get(0).getBeaconValue(BeaconValueIndex.MinewBeaconValueIndex_RSSI).getFloatValue();
                                //Log.i(deviceUUID, deviceUUID);
                                for (MinewBeacon mMinewBeacon : minewBeacons) {
                                    deviceUUID = mMinewBeacon.getBeaconValue(BeaconValueIndex.MinewBeaconValueIndex_MAC).getStringValue();
                                    String deviceInRange = mMinewBeacon.getBeaconValue(BeaconValueIndex.MinewBeaconValueIndex_RSSI).getStringValue();
                                    Log.i(deviceUUID, deviceInRange);
                                }
                            }
                        }
                    });
                   
                }
    
                /**
                 *  the manager calls back this method when BluetoothStateChanged.
                 *
                 *  @param state BluetoothState
                 */
                @Override
                public void onUpdateState(BluetoothState state) {
                    switch (state) {
                        case BluetoothStatePowerOn:
                            break;
                        case BluetoothStatePowerOff:
                            errorMessage = "BluetoothStatePowerOff";
                            break;
                        case BluetoothStateNotSupported:
                            errorMessage = "BluetoothStatePowerOff";
                            break;
                    }
                }
            });
        }catch(Exception e){
            e.printStackTrace();
            throw e;
        }
    }

    private void showBLEDialog() {
        Intent enableIntent = new Intent(BluetoothAdapter.ACTION_REQUEST_ENABLE);
        startActivityForResult(enableIntent, REQUEST_ENABLE_BT);
    }

    // private void initManager() {
    //     mMinewBeaconManager = MinewBeaconManager.getInstance(this);
    // }

    // private void checkBluetooth() {
    //     BluetoothState bluetoothState = mMinewBeaconManager.checkBluetoothState();
    //     switch (bluetoothState) {
    //         case BluetoothStateNotSupported:
    //             finish();
    //             break;
    //         case BluetoothStatePowerOff:
    //             break;
    //         case BluetoothStatePowerOn:
    //             break;
    //     }
    // }

    // private void initListener() {
    //     if (mMinewBeaconManager != null) {
    //         BluetoothState bluetoothState = mMinewBeaconManager.checkBluetoothState();
    //         switch (bluetoothState) {
    //             case BluetoothStateNotSupported:
    //                 finish();
    //                 break;
    //             case BluetoothStatePowerOff:
    //                 return;
    //             case BluetoothStatePowerOn:
    //                 break;
    //         }
    //     }
    //     if (isScanning) {
    //         isScanning = false;
    //         if (mMinewBeaconManager != null) {
    //             mMinewBeaconManager.stopScan();
    //         }
    //     } else {
    //         isScanning = true;
    //         try {
    //             mMinewBeaconManager.startScan();
    //         } catch (Exception e) {
    //             e.printStackTrace();
    //         }
    //     }
        
    //     mMinewBeaconManager.setDeviceManagerDelegateListener(new MinewBeaconManagerListener() {
    //         /**
    //          *   if the manager find some new beacon, it will call back this method.
    //          *
    //          *  @param minewBeacons  new beacons the manager scanned
    //          */
    //         @Override
    //         public void onAppearBeacons(List<MinewBeacon> minewBeacons) {

    //         }

    //         /**
    //          *  if a beacon didn't update data in 10 seconds, we think this beacon is out of rang, the manager will call back this method.
    //          *
    //          *  @param minewBeacons beacons out of range
    //          */
    //         @Override
    //         public void onDisappearBeacons(List<MinewBeacon> minewBeacons) {
    //             /*for (MinewBeacon minewBeacon : minewBeacons) {
    //                 String deviceName = minewBeacon.getBeaconValue(BeaconValueIndex.MinewBeaconValueIndex_Name).getStringValue();
    //                 Toast.makeText(getApplicationContext(), deviceName + "  out range", Toast.LENGTH_SHORT).show();
    //             }*/
    //         }

    //         /**
    //          *  the manager calls back this method every 1 seconds, you can get all scanned beacons.
    //          *
    //          *  @param minewBeacons all scanned beacons
    //          */
    //         @Override
    //         public void onRangeBeacons(final List<MinewBeacon> minewBeacons) {
    //             for (MinewBeacon mMinewBeacon : minewBeacons) {
    //                 deviceUUID = mMinewBeacon.getBeaconValue(BeaconValueIndex.MinewBeaconValueIndex_UUID).getStringValue();
    //             }
    //         }

    //         /**
    //          *  the manager calls back this method when BluetoothStateChanged.
    //          *
    //          *  @param state BluetoothState
    //          */
    //         //@Override
    //         public void onUpdateState(BluetoothState state) {
    //             switch (state) {
    //                 case BluetoothStatePowerOn:
    //                     break;
    //                 case BluetoothStatePowerOff:
    //                     break;
    //                 default:
    //                     break;
    //             }
    //         }
    //     });
    // }

    // @Override
    // protected void onDestroy() {
    //     super.onDestroy();
    //     //stop scan
    //     if (isScanning) {
    //         mMinewBeaconManager.stopScan();
    //     }
    // }

}