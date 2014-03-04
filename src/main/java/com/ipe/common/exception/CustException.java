package com.ipe.common.exception;

/**
 * Created by tangdu on 14-2-28.
 */
public class CustException extends Exception {
    private int code;

    public int getCode() {
        return code;
    }
    public CustException(Exception e){
        this.code=200;
    }
    public CustException(Exception e,ExceptionCode code){
        this.code=code.getCode();
    }
}
