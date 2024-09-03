AC_INIT([libRaspberry], [1.0], [mail@emailprovider])
AC_CONFIG_AUX_DIR([build-aux])
AC_CONFIG_MACRO_DIR([m4])
AM_INIT_AUTOMAKE([foreign -Wall -Werror])
AC_PROG_CC
AM_PROG_AR
LT_INIT
AM_PATH_PYTHON([3])
AC_CONFIG_HEADERS([config.h])
AC_PATH_PROG([PYTHON], [python3], [no])

if test "$PYTHON" = "no"; then
  AC_MSG_ERROR([Python 3 no encontrado. Por favor, instala Python 3.])
fi

AC_CONFIG_FILES([Makefile lib/Makefile src/Makefile])
AC_OUTPUT
