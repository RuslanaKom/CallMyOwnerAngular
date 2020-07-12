FROM nginx:1.17.6-alpine

ADD ./nginx-conf.conf /etc/nginx/conf.d/default.conf
ADD ./dist/call-my-owner  /usr/share/nginx/html

#RUN mkdir -p /vf
#ADD ./build/entry.sh /vf
#RUN chmod u+x /vf/entry.sh
#
#CMD /vf/entry.sh

#docker build -f Dockerfile -t ruslana/call_my_owner_front .
#docker run -d -p 8080:80 ruslana/call_my_owner_front
