package com.ipe.module.core.entity;

import com.alibaba.fastjson.annotation.JSONField;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.ipe.common.entity.IDEntity;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Collection;

/**
 * Created with IntelliJ IDEA.
 * User: tangdu
 * Date: 13-9-7
 * Time: 下午9:10
 * To change this template use File | Settings | File Templates.
 */
@JsonIgnoreProperties({"userPwd", "userRoles"})
@Table(name = "t_cor_user", schema = "", catalog = "db_work")
@Entity
@JsonSerialize(include = JsonSerialize.Inclusion.NON_NULL)
public class User extends IDEntity {
    private String userAccount;

    @Column(name = "user_account", nullable = true, insertable = true, updatable = true, length = 100, precision = 0)
    @JSONField(serialize = false)
    public String getUserAccount() {
        return userAccount;
    }

    public void setUserAccount(String userAccount) {
        this.userAccount = userAccount;
    }

    private String userPwd;

    @Column(name = "user_pwd", nullable = true, insertable = true, updatable = true, length = 100, precision = 0)
    @JSONField(serialize = false)
    public String getUserPwd() {
        return userPwd;
    }

    public void setUserPwd(String userPwd) {
        this.userPwd = userPwd;
    }

    private String enabled;

    @Column(name = "enabled_", nullable = true, insertable = true, updatable = true, length = 2, precision = 0)
    public String getEnabled() {
        return enabled;
    }

    public void setEnabled(String enabled) {
        this.enabled = enabled;
    }

    private String remark;

    @Column(name = "remark_", nullable = true, insertable = true, updatable = true, length = 1000, precision = 0)
    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    private String userName;

    @Column(name = "user_name", nullable = true, insertable = true, updatable = true, length = 100, precision = 0)
    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    private String isAdmin;

    @Column(name = "is_admin", nullable = true, insertable = true, updatable = true, length = 2, precision = 0)
    @JSONField(serialize = false)
    public String getAdmin() {
        return isAdmin;
    }

    public void setAdmin(String admin) {
        isAdmin = admin;
    }

    private Timestamp createdDate;

    @Column(name = "created_date", nullable = true, insertable = true, updatable = true, length = 19, precision = 0)
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @CreatedDate
    public Timestamp getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Timestamp createdDate) {
        this.createdDate = createdDate;
    }

    private Timestamp updatedDate;

    @Column(name = "updated_date", nullable = true, insertable = true, updatable = true, length = 19, precision = 0)
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @LastModifiedDate
    public Timestamp getUpdatedDate() {
        return updatedDate;
    }

    public void setUpdatedDate(Timestamp updatedDate) {
        this.updatedDate = updatedDate;
    }

    private String resourceId;


    //关联用户角色
    private Collection<UserRole> userRoles;

    @JSONField(serialize = false)
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    public Collection<UserRole> getUserRoles() {
        return userRoles;
    }

    public void setUserRoles(Collection<UserRole> userRoles) {
        this.userRoles = userRoles;
    }
}
