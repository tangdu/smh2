package com.ipe.module.core.repository;

import com.ipe.common.dao.CustomerRepository;
import com.ipe.module.core.entity.Menu;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: tangdu
 * Date: 13-10-5
 * Time: 下午3:23
 * To change this template use File | Settings | File Templates.
 */
public interface MenuRepository extends CustomerRepository<Menu, String> {
    @Query( "from Menu m where m.parent.id=:pid")
    public List<Menu> getParentMenu(@Param("pid") String pid);

    @Query("select max(sno)+1 from Menu")
    public int getMaxSno();

    @Modifying
    @Query("update Menu set parent.id=:pid,sno=:sno where id=:id")
    public void updateParent(@Param("pid") String pid,@Param("sno") int sno,@Param("id") String id);
}
