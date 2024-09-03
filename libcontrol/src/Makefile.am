bin_PROGRAMS =
EXTRA_DIST = app.py
AM_CPPFLAGS = -I$(top_srcdir)/include
PYTHONPATH = $(top_builddir)/lib/.libs

.PHONY: run
run:
	PYTHONPATH=$(PYTHONPATH) $(PYTHON) app.py

install-exec-local:
	mkdir -p $(DESTDIR)$(prefix)
	cp $(srcdir)/app.py $(DESTDIR)$(prefix)/
