package com.ipe.module.bpm.service;

import com.ipe.common.dao.CustomerRepository;
import com.ipe.common.service.BaseService;
import com.ipe.module.bpm.entity.TaskProxy;
import com.ipe.module.bpm.respository.TaskProxyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@Transactional
public class TaskProxyService extends BaseService<TaskProxy, String> {
    @Autowired
    private TaskProxyRepository taskProxyRepository;

    @Override
    protected CustomerRepository getRepository() {
        return taskProxyRepository;
    }

    /**
     * 更新状态
     * @param ids
     */
    public void udpateStatus(String ids[]){
        if(ids!=null){
            for(String id:ids){
                TaskProxy taskProxy=this.get(id);
                if("1".equals(taskProxy.getStatus())){
                    taskProxy.setStatus("0");
                }else{
                    taskProxy.setStatus("1");
                }
                this.save(taskProxy);
            }
        }
    }
}
