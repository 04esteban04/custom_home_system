lib_LTLIBRARIES = libRaspberry.la
libRaspberry_la_LDFLAGS = -shared
include_HEADERS = $(top_srcdir)/include/libRaspberry.h
AM_CPPFLAGS = -I/usr/local/include -I$(top_srcdir)/include
libRaspberry_la_SOURCES = libRaspberry.c
libRaspberry_la_LIBADD = -lwiringPi
