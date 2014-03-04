package com.ipe.module.core.service;

import com.alibaba.fastjson.JSON;
import com.ipe.common.dao.CustomerRepository;
import com.ipe.common.dao.SpringJdbcDao;
import com.ipe.common.service.BaseService;
import com.ipe.common.util.ExcelParse;
import com.ipe.common.exception.Exceptions;
import com.ipe.module.core.entity.ExlImptpl;
import com.ipe.module.core.entity.ExlImptplDetailes;
import com.ipe.module.core.repository.ExlImptplRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.ArrayList;
import java.util.List;


@Service
@Transactional(readOnly = true)
public class ExlImptplService extends BaseService<ExlImptpl, String> {
    @Autowired
    private ExlImptplRepository exlImptplRepository;
    @PersistenceContext
    private EntityManager entityManager;
    @Autowired
    private SpringJdbcDao springJdbcDao;

    @Override
    protected CustomerRepository getRepository() {
        return exlImptplRepository;
    }

    public void createTable(String tableName, List<ExlImptplDetailes> detaileses) {
        StringBuilder stringBuilder = new StringBuilder("create table if not exists ");
        stringBuilder.append(tableName).append(" (");
        for (ExlImptplDetailes de : detaileses) {
            stringBuilder.append(" ").append(de.getTableCol()).append(" ").append(de.getColType()).append(" ,");
        }
        String sql = stringBuilder.substring(0, stringBuilder.lastIndexOf(",")) + " )";
        entityManager.createNativeQuery(sql).executeUpdate();
    }

    @Transactional(readOnly = false)
    public void save(ExlImptpl exlImptpl, String details) {
        List<ExlImptplDetailes> detaileses = JSON.parseArray(details, ExlImptplDetailes.class);
        for (ExlImptplDetailes de : detaileses) {
            de.setExlImptpl(exlImptpl);
        }
        exlImptpl.setDetailesSet(detaileses);
        this.save(exlImptpl);
        createTable(exlImptpl.getMappingTable(), detaileses);
    }

    @Transactional(readOnly = false)
    public void edit(ExlImptpl exlImptpl, String details) {
        this.deleteById(exlImptpl.getId());
        exlImptpl.setId(null);
        save(exlImptpl, details);
    }

    @Transactional(readOnly = false)
    public String impData(String appendixPath, String id) {
        try {
            ExlImptpl exlImptpl = this.get(id);
            StringBuilder stringBuilder=new StringBuilder("insert into " + exlImptpl.getMappingTable() + " values (");
            int pocot = exlImptpl.getDetailesSet().size();
            for(int i=0;i<pocot;i++){
                stringBuilder.append("?,");
            }
            /////////////
            ExcelParse excelParse = new ExcelParse(appendixPath);
            ArrayList<Object[]> arrayList = excelParse.read(exlImptpl.getSheetIndex(),exlImptpl.getStartrowIndex(),exlImptpl.getStartcolIndex());
            Query query = entityManager.createNativeQuery(stringBuilder.substring(0, stringBuilder.lastIndexOf(",")) + ")");
            for(Object[] obj:arrayList){
                for(int i=0;i<obj.length;i++){
                    query.setParameter(i+1,obj[i]);
                }
                query.executeUpdate();
            }
            int successCot=arrayList.size();
            return "{successCot:"+successCot+",failureCot:0,total:"+successCot+"}";
        } catch (Exception e) {
            Exceptions.throwServiceException(e);
        }
        return "{successCot:0,failureCot:0,total:0}";
    }
}
