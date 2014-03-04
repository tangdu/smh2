package com.ipe.module.core.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.ipe.common.entity.IDEntity;
import org.hibernate.annotations.*;

import javax.persistence.*;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.sql.Timestamp;
import java.util.Collection;

/**
 * Created with IntelliJ IDEA.
 * User: tangdu
 * Date: 13-9-7
 * Time: 下午9:10
 * To change this template use File | Settings | File Templates.
 */
@JsonIgnoreProperties({"hibernateLazyInitializer","authorities", "userRoles"})
@Table(name = "t_cor_role", schema = "", catalog = "db_work")
@Entity
@org.hibernate.annotations.Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
public class Role extends IDEntity {


    private String roleName;

    @Column(name = "role_name", nullable = false, insertable = true, updatable = true, length = 100, precision = 0)
    @Basic
    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    private String enabled;

    @Column(name = "enabled_", nullable = true, insertable = true, updatable = true, length = 2, precision = 0)
    @Basic
    public String getEnabled() {
        return enabled;
    }

    public void setEnabled(String enabled) {
        this.enabled = enabled;
    }

    private String remark;

    @Column(name = "remark_", nullable = true, insertable = true, updatable = true, length = 1000, precision = 0)
    @Basic
    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    private Timestamp createdDate;

    @Column(name = "created_date", nullable = true, insertable = true, updatable = true, length = 19, precision = 0)
    @Basic
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    public Timestamp getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Timestamp createdDate) {
        this.createdDate = createdDate;
    }

    private Timestamp updatedDate;

    @Column(name = "updated_date", nullable = true, insertable = true, updatable = true, length = 19, precision = 0)
    @Basic
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    public Timestamp getUpdatedDate() {
        return updatedDate;
    }

    public void setUpdatedDate(Timestamp updatedDate) {
        this.updatedDate = updatedDate;
    }


    //关联权限
    private Collection<Authority> authorities;

    @OneToMany(mappedBy = "role",cascade = CascadeType.ALL)
    public Collection<Authority> getAuthorities() {
        return authorities;
    }

    public void setAuthorities(Collection<Authority> authorities) {
        this.authorities = authorities;
    }

    //关联用户角色
    private Collection<UserRole> userRoles;

    @OneToMany(mappedBy = "role",cascade = CascadeType.ALL)
    public Collection<UserRole> getUserRoles() {
        return userRoles;
    }

    public void setUserRoles(Collection<UserRole> userRoles) {
        this.userRoles = userRoles;
    }
}
