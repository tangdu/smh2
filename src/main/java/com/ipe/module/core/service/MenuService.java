package com.ipe.module.core.service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.serializer.PropertyFilter;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.ipe.common.dao.CustomerRepository;
import com.ipe.common.service.BaseService;
import com.ipe.module.core.entity.Menu;
import com.ipe.module.core.repository.MenuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashSet;
import java.util.List;


/**
 * Created with IntelliJ IDEA.
 * User: tangdu
 * Date: 13-10-5
 * Time: 下午3:24
 * To change this template use File | Settings | File Templates.
 */
@Service
@Transactional
public class MenuService extends BaseService<Menu, String> {
    @Autowired
    private MenuRepository menuRepository;
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    protected CustomerRepository<Menu, String> getRepository() {
        return menuRepository;
    }


    public List<Menu> getMenus(final String pid) {
        List<Menu> all = menuRepository.findAll(new Specification<Menu>() {
            @Override
            public Predicate toPredicate(Root<Menu> root, CriteriaQuery<?> cq, CriteriaBuilder cb) {
                List<Predicate> list = new ArrayList<Predicate>();
                /*if (StringUtils.isNotBlank(pid)) {
                    list.add(cb.equal(root.get("pid").as(String.class),pid));
                } else {
                    list.add(cb.isNull(root.get("pid")));
                }*/
                list.add(cb.isNull(root.get("parent")));
                return cb.and(list.toArray(new Predicate[list.size()]));
            }
        });
        return all;
    }

    public Menu saveMenu(Menu menu) {
        menu.setParent(menuRepository.findOne(menu.getParent().getId()));
        menu.setCreatedDate(new Timestamp(Calendar.getInstance().getTimeInMillis()));
        menu.setSno(menuRepository.getMaxSno());
        return menuRepository.save(menu);
    }

    /**
     * 用户所具有的菜单，关联权限
     *
     * @param userId
     * @return
     */
    @Transactional(readOnly = true)
    public String getUserMenu(String userId) {
        Menu root = null;
        if (true) {
            String sql = "SELECT\n" +
                    "	*\n" +
                    "FROM\n" +
                    "	(\n" +
                    "		SELECT\n" +
                    "			*\n" +
                    "		FROM\n" +
                    "			t_cor_menu\n" +
                    "		WHERE\n" +
                    "			id_ IN (\n" +
                    "				SELECT DISTINCT\n" +
                    "					pid\n" +
                    "				FROM\n" +
                    "					(\n" +
                    "						SELECT\n" +
                    "							t1.id_,\n" +
                    "							t1.pid\n" +
                    "						FROM\n" +
                    "							t_cor_menu t1\n" +
                    "						WHERE\n" +
                    "							t1.resource_id IN (\n" +
                    "								SELECT\n" +
                    "									t5.resource_id\n" +
                    "								FROM\n" +
                    "									t_cor_user t2\n" +
                    "								INNER JOIN t_cor_user_role t3 ON t2.id_ = t3.user_id\n" +
                    "								JOIN t_cor_role t4 ON t4.id_ = t3.role_id\n" +
                    "								JOIN t_cor_authority t5 ON t5.role_id = t4.id_\n" +
                    "								WHERE\n" +
                    "									t2.id_ = '"+userId+"'\n" +
                    "							)\n" +
                    "						AND t1.enabled_ = '1'\n" +
                    "					) t\n" +
                    "				WHERE\n" +
                    "					t.pid IS NOT NULL\n" +
                    "				AND t.pid NOT IN (\n" +
                    "					SELECT\n" +
                    "						t1.id_\n" +
                    "					FROM\n" +
                    "						t_cor_menu t1\n" +
                    "					WHERE\n" +
                    "						t1.resource_id IN (\n" +
                    "							SELECT\n" +
                    "								t5.resource_id\n" +
                    "							FROM\n" +
                    "								t_cor_user t2\n" +
                    "							INNER JOIN t_cor_user_role t3 ON t2.id_ = t3.user_id\n" +
                    "							JOIN t_cor_role t4 ON t4.id_ = t3.role_id\n" +
                    "							JOIN t_cor_authority t5 ON t5.role_id = t4.id_\n" +
                    "							WHERE\n" +
                    "								t2.id_ = '"+userId+"'\n" +
                    "						)\n" +
                    "					AND t1.enabled_ = '1'\n" +
                    "				)\n" +
                    "			)\n" +
                    "		UNION\n" +
                    "			SELECT\n" +
                    "				*\n" +
                    "			FROM\n" +
                    "				t_cor_menu t1\n" +
                    "			WHERE\n" +
                    "				t1.resource_id IN (\n" +
                    "					SELECT\n" +
                    "						t5.resource_id\n" +
                    "					FROM\n" +
                    "						t_cor_user t2\n" +
                    "					INNER JOIN t_cor_user_role t3 ON t2.id_ = t3.user_id\n" +
                    "					JOIN t_cor_role t4 ON t4.id_ = t3.role_id\n" +
                    "					JOIN t_cor_authority t5 ON t5.role_id = t4.id_\n" +
                    "					WHERE\n" +
                    "						t2.id_ = '"+userId+"'\n" +
                    "				)\n" +
                    "			AND t1.enabled_ = '1'\n" +
                    "	) tt\n" +
                    "ORDER BY\n" +
                    "	tt.sno_ ASC";
            List<Menu> menus = entityManager.createNativeQuery(sql, Menu.class).getResultList();
            if (menus == null || menus.isEmpty()) {
                return "[]";
            }
            for (Menu menu : menus) {
                if (menu.getParent() == null) {
                    root = new Menu();
                    root.setId(menu.getId());
                    root.setMenuName(menu.getMenuName());
                    root.setParent(menu.getParent());
                    root.setMenuUrl(menu.getMenuUrl());
                    root.setMenuType(menu.getMenuType());
                    root.setLeaf(menu.isLeaf());
                }
            }
            eachMenu(menus, root);
        } else {
            //查询到Root
            root = menuRepository.findOne(new Specification<Menu>() {
                @Override
                public Predicate toPredicate(Root<Menu> root, CriteriaQuery<?> cq, CriteriaBuilder cb) {
                    return cb.isNull(root.get("parent"));
                }
            });
        }
        if (root == null) {
            throw new RuntimeException("root is null");
        }

        PropertyFilter propertyFilter = new PropertyFilter() {
            @Override
            public boolean apply(Object source, String name, Object value) {
                if ("id".equals(name)) {
                    return true;
                } else if ("menu".equals(name)) {
                    return true;
                } else if ("menuUrl".equals(name)) {
                    return true;
                } else if ("menuType".equals(name)) {
                    return true;
                } else if ("text".equals(name)) {
                    return true;
                } else if ("leaf".equals(name)) {
                    return true;
                }
                return false;
            }
        };
        eachMenu(root);
        return JSON.toJSONString(root.getRows(), propertyFilter, SerializerFeature.UseSingleQuotes);
    }

    void eachMenu(List<Menu> menus, Menu root) {
        for (Menu m1 : menus) {
            if (m1.getParent() != null && root.getId().equals(m1.getParent().getId())) {
                if (root.getRows() == null) {
                    root.setRows(new HashSet<Menu>());
                }
                root.getRows().add(m1);
                eachMenu(menus, m1);
            }
        }
    }

    void eachMenu(Menu root){
        if(root.getRows().isEmpty()){
            root.setRows(null);
        }else{
            for (Menu m1 : root.getRows()) {
                eachMenu(m1);
            }
        }
    }

    void eachTreeMenu(Menu root, StringBuffer sbt) {
        sbt.append("{text:'" + root.getMenuName() + "',scope:this");
        if (!root.isLeaf()) {
            StringBuffer sbr = new StringBuffer(",menu:[");
            for (Menu m : root.getRows()) {
                eachTreeMenu(m, sbr);
            }
            String t = sbr.substring(0, sbr.lastIndexOf(","));
            sbt.append(t).append("]");
        } else {
            sbt.append(",handler:this.menuClick,attr:{menuUrl:'" + root.getMenuUrl() + "',menuType:'" + root.getMenuType() + "'}");
        }
        sbt.append("},");
    }

    @Transactional(readOnly = false)
    public void updateMenus(String[] ids, String pid) {
        for (int i = 0; i < ids.length; i++) {
            menuRepository.updateParent(pid, i, ids[i]);
        }
    }
}
