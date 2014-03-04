package com.ipe.common.util;

import com.ipe.common.exception.CustException;
import com.ipe.common.exception.Exceptions;
import org.apache.poi.hssf.usermodel.*;
import org.apache.poi.ss.usermodel.Row;

import java.io.File;
import java.io.FileInputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

/**
 * Created by tangdu on 14-2-28.
 */
public class ExcelParse {
    private HSSFWorkbook wb;
    private int sheetCot=0;

    public ExcelParse(String file) throws CustException{
        try {
            wb = new HSSFWorkbook(new FileInputStream(file));
            sheetCot=wb.getNumberOfSheets();
        } catch (Exception e) {
            throw Exceptions.throwCustException(e);
        }
    }

    public ExcelParse(File file) throws CustException {
        try {
            wb = new HSSFWorkbook(new FileInputStream(file));
            sheetCot=wb.getNumberOfSheets();
        } catch (Exception e) {
            throw Exceptions.throwCustException(e);
        }
    }

    public Map<Integer,String> sheet(){
        Map<Integer,String> sheets=new HashMap<>();
        for(int i=0;i<wb.getNumberOfSheets();i++){
            sheets.put(i,wb.getSheetName(i));
        }
        return sheets;
    }

    public  ArrayList<Object[]> read(Integer sheet){
     return read(sheet,1,1);
    }

    public ArrayList<Object[]> read(Integer sheet,Integer startRow,Integer startCol){
        if(sheet==null){
            sheet=1;
        }
        ArrayList<Object[]> rowList = new ArrayList<Object[]>();
        if(wb!=null){
            HSSFSheet hssfSheet=wb.getSheetAt(sheet-1);
            HSSFRow hssfRow=null;
            HSSFCell hssfCell=null;
            Iterator<Row> rows = hssfSheet.iterator();
            //遍历有效行
            int row=0;
            while (rows.hasNext()) {
                hssfRow=(HSSFRow)rows.next();
                row++;
                if(row<startRow){
                    continue;
                }
                //////////////
                int col = 0;
                int lastCellNum = (int) hssfRow.getLastCellNum();
                Object[] aCells = new Object[lastCellNum];
                while (col < lastCellNum) {
                    try {
                        hssfCell = hssfRow.getCell(col);
                        aCells[col] = getCell(hssfCell);
                    } catch (Exception ex) {
                        ex.printStackTrace();
                    }
                    col++;
                }
                boolean notBlankLine = false;
                for (int k = 0; k < aCells.length; k++) {
                    if (aCells[k] != null && aCells[k].toString().length() > 0) {
                        notBlankLine = true;
                        break;
                    }
                }
                if (notBlankLine) {
                    rowList.add(aCells);
                }

            }
        }
        return rowList;
    }

    public Object getCell(HSSFCell hssfCell){
        switch (hssfCell.getCellType()) {
            case HSSFCell.CELL_TYPE_NUMERIC: // 数字
                if (HSSFDateUtil.isCellDateFormatted(hssfCell)) {
                    return hssfCell.getDateCellValue();
                }else{
                    return hssfCell.getNumericCellValue();
                }
            case HSSFCell.CELL_TYPE_STRING: // 字符串
                return hssfCell.getStringCellValue();
            case HSSFCell.CELL_TYPE_BOOLEAN: // Boolean
                return hssfCell.getBooleanCellValue();
            case HSSFCell.CELL_TYPE_FORMULA: // 公式
                return hssfCell.getCellFormula();
            case HSSFCell.CELL_TYPE_BLANK: // 空值
                return "";
            case HSSFCell.CELL_TYPE_ERROR: // 故障
                return "";
            default:
                return "";
        }
    }


   public static void main(String [] arags){
       try {
           ExcelParse excelParse=new ExcelParse("C:\\Users\\tangdu\\Desktop\\控制措施（已修改）.xls");
           ArrayList<Object[]> data=excelParse.read(1);
           for(Object [] aa :data){
               for(Object a :aa){
                   System.out.print(a+"#");
               }
               System.out.println();
           }
       } catch (CustException e) {
           e.printStackTrace();
       }
   }
}
