package com.ipe.module.core.service;

import com.ipe.common.dao.CustomerRepository;
import com.ipe.common.service.BaseService;
import com.ipe.module.core.entity.*;
import com.ipe.module.core.repository.*;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.Collection;
import java.util.List;
import java.util.Set;

/**
 * Created with IntelliJ IDEA.
 * User: tangdu
 * Date: 13-9-14
 * Time: 下午11:00
 * To change this template use File | Settings | File Templates.
 */
@Service
@Transactional(readOnly = true)
public class RoleService extends BaseService<Role,String> {
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserRoleRepository userRoleRepository;
    @Autowired
    private AuthorityRepository authorityRepository;
    @Autowired
    private ResourceRepository resourceRepository;
    @Autowired
    private ResourceService resourceService;
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    protected CustomerRepository getRepository() {
        return roleRepository;
    }

    @Transactional
    public void saveUserRole(String [] urids,String userId){
        //先删除
        roleRepository.delUserRole(userId);
        //新增
        User user=userRepository.findOne(userId);
        for(String roleId : urids){
            if(StringUtils.isNotBlank(roleId)){
                Role role=roleRepository.findOne(roleId);
                UserRole userRole=new UserRole();
                userRole.setRole(role);
                userRole.setUser(user);
                userRoleRepository.save(userRole);
            }
        }
    }

    //配置权限
    @Transactional(readOnly = false)
    public void saveAuthority(String []ids,String roleId){
        //先删除
        authorityRepository.delRoleAuthority(roleId);
        /*entityManager.createQuery("delete from Authority t where t.role.id='" + roleId + "'")
                //.setParameter("roleId",roleId)
                .executeUpdate();*/
        //新增
        Role role=roleRepository.findOne(roleId);
        if(ids!=null){
            for(String id :ids){
                if(StringUtils.isNotBlank(id)){
                    Resource resource=resourceRepository.findOne(id);
                    Authority authority=new Authority();
                    authority.setResource(resource);
                    authority.setRole(role);
                    authorityRepository.save(authority);
                }
            }
        }
    }

    //巳有权限
    public List<Resource> getAuthoritys(final String roleId){
        //查询所有资源-树结构
        List<Resource> lists=resourceService.getResources(null);
        //查询角色资源
        Set<Resource> mylist=authorityRepository.getRoleByAuthority(roleId);
        if(mylist==null || mylist.isEmpty()){
            eachAuthoritys(lists);
        }else{
            eachAuthoritys(lists);//
            eachAuthoritys(mylist,lists);
        }
        return lists;
    }

    public void eachAuthoritys(Collection<Resource> lists){
        for(Resource r1:lists){
            r1.setChecked(false);
            if(r1.getRows()!=null && !r1.getRows().isEmpty()){
                eachAuthoritys(r1.getRows());
            }
        }
    }

    public void eachAuthoritys(Set<Resource> mylist,Collection<Resource> lists){
        for(Resource r1:lists){
            for(Resource r2:mylist){
                if(r2.getId().equals(r1.getId())){
                    r1.setChecked(true);
                }
            }

            if(r1.getRows()!=null && !r1.getRows().isEmpty()){
                eachAuthoritys(mylist,r1.getRows());
            }
        }
    }
}
