#!/bin/bash

for file in `grep -l '"url": "\\\n' cov_profile/*`; do
  echo rm $file;
  rm $file;
done
