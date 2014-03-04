package com.ipe.module.core.service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.ipe.common.dao.CustomerRepository;
import com.ipe.common.service.BaseService;
import com.ipe.module.core.entity.SysConfig;
import com.ipe.module.core.repository.SysConfigRepository;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;


@Service
@Transactional
public class SysConfigService extends BaseService<SysConfig,String> {
    @Autowired
    private SysConfigRepository sysConfigRepository;

    @Override
    protected CustomerRepository getRepository() {
        return sysConfigRepository;
    }

    public void save(String params){
        if(StringUtils.isNotBlank(params)){
            sysConfigRepository.deleteAll();
            JSONObject jsonObject=JSON.parseObject(params);
            int i=0;
            for(Map.Entry<String,Object> entry :jsonObject.entrySet()){
                SysConfig sysConfig=new SysConfig();
                if(entry.getKey().indexOf("(")!=-1){
                    sysConfig.setKey(entry.getKey().substring(0,entry.getKey().indexOf("(")));
                    sysConfig.setRemark(entry.getKey().substring(entry.getKey().indexOf("(")));
                }else{
                    sysConfig.setKey(entry.getKey());
                }
                sysConfig.setValue(entry.getValue().toString());
                if("false".equals(sysConfig.getValue())||"true".equals(sysConfig.getValue())){
                    sysConfig.setType("bool");
                }else{
                    sysConfig.setType("string");
                }
                sysConfig.setSno(i);
                sysConfig.setValue(String.valueOf(entry.getValue()));
                i++;
                sysConfigRepository.save(sysConfig);
            }
        }
    }
}
