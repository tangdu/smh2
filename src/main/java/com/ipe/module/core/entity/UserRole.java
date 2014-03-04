package com.ipe.module.core.entity;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.ipe.common.entity.IDEntity;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

/**
 * Created with IntelliJ IDEA.
 * User: tangdu
 * Date: 13-9-7
 * Time: 下午9:10
 * To change this template use File | Settings | File Templates.
 */
@Table(name = "t_cor_user_role", schema = "", catalog = "db_work")
@Entity
@JsonSerialize(include = JsonSerialize.Inclusion.NON_NULL)
public class UserRole extends IDEntity {
    //关联角色
    private Role role;

    @ManyToOne
    @JoinColumn(name = "role_id", referencedColumnName = "id_")
    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }


    //关联用户
    private User user;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id_")
    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
