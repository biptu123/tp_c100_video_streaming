ffmpeg -i rtsp://walgi_polyhouse1:Qwerty123@192.168.100.252:554/stream1 \
-fflags flush_packets \
-max_delay 1\
-flags -global_header \
-hls_time 1\
-hls_list_size 2\
-vcodec copy \
-y ./videos/ipcam/index.m3u8
